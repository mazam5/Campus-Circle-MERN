import User from '../models/User.js'
import ErrorHandler from '../utils/errorhandler.js';
import bcrypt from 'bcrypt';

// get user
export const getUser = async (req, res, next)=> {
    const id = req.params.id
    try {
        const user = await User.findById(id);
        if(user) {
            user.viewedProfiles += 1
            await user.save()
            res.status(200).json(user);
        }else{
            return next(new ErrorHandler("No such user exists", 400))
        }
        
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}   

// my profile
export const myProfile = async(req,res,next) => {
    const id = req.user._id
    if(!id) {
        return next(new ErrorHandler("login first", 400))
    }
    try {
        const user = await User.findById(id);
        if(user) {
            res.status(200).json(user);
        }
        else{
            return next(new ErrorHandler("No such user exists", 400))
        }
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}


// update user
export const updateUser = async(req,res,next) => {
    const id = req.params.id;
    const {currentUserId, admin, password} = req.body;

    if(currentUserId === id || admin) {
        try {
            if(password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                req.body.password = hashedPassword;
            }
            const user = await User.findByIdAndUpdate(id, {$set: req.body}, {new:true});
            res.status(200).json(user);
        } catch (error) {
            return next(new ErrorHandler(error, 404));
        }
    }
    else {
        return next(new ErrorHandler("You can update only your Account", 404));
    }
}

// delete
export const deleteUser = async(req,res,next)=> {
    const id = req.params.id;
    try {  
        if(req.body.currentUserId === id || admin) {
            await User.findByIdAndDelete(id);
            res.status(200).json("user deleted successfully");
        }
        else {
            return next(new ErrorHandler("Access Denied! You can delete only your account", 400))
        }
    } catch (error) {
        return next(new ErrorHandler(err, 404));
    }
}

// follow a user
export const follow = async(req, res, next) => {
    const id = req.params.id;
    const {currentUserId} = req.body;

    try {
        if(id !== currentUserId) {
            const currentUser = await User.findById(currentUserId);
            const followUser = await User.findById(id);
            if(!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$push : {followers : currentUserId}});
                await currentUser.updateOne({$push : {following : id}});
                res.status(200).json("user followed!");
            }
            else {
                return next(new ErrorHandler("You already follow this account",403));
            }
        }
        else {
            return next(new ErrorHandler("You cannot follow youself"));
        }
    } catch (error) {
        return next(new ErrorHandler(error,404))
    }

}
// unfollow a user
export const unfollow = async(req, res, next) => {
    const id = req.params.id;
    const {currentUserId} = req.body;
    try {
        if(id !== currentUserId) {
            const currentUser = await User.findById(currentUserId);
            const unfollowUser = await User.findById(id);
    
            if(unfollowUser.followers.includes(currentUserId)) {
                await currentUser.updateOne({$pull : {following : id}});
                await unfollowUser.updateOne({$pull : {followers : currentUserId}});
                res.status(200).json("unfollowed the user!");
            }
            else {
                return next(new ErrorHandler("you donot follow this account to unfollow",403));
            }
        }
        else {
            return next(new ErrorHandler("You cannot unfollow yourself", 403));
        }
        
    } catch (error) {
        return next(new ErrorHandler(error, 403));
    }
}

export const getUserFriends = async (req, res, next) => {
    try {
        const users = await User.find({
            _id: {$ne : req.user._id},
            $and: [
              { followers: { $exists: true, $not: { $size: 0 } } },
              { following: { $exists: true, $not: { $size: 0 } } }
            ]
          }).select('firstName lastName avatar');
      
          res.status(200).json(users);
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  };

  
export const getUnfollowedFollowers = async (req, res, next) => {
    try {
      const loggedInUserId = req.user._id
  
      const loggedInUser = await User.findById(loggedInUserId);
  
      const unfollowedFollowers = loggedInUser.followers.filter(
        (followerId) => !loggedInUser.following.includes(followerId)
      );
  
      const unfollowedFollowersDetails = await User.find({
        _id: { $in: unfollowedFollowers },
      });
  
      res.status(200).json(unfollowedFollowersDetails);
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  };
  