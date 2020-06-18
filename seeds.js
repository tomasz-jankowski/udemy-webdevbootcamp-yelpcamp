const mongoose = require('mongoose');
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam molestie ligula eget erat pellentesque, in mattis tortor sodales. Nullam id nisi lorem. Etiam dictum est at justo consequat, auctor molestie nulla luctus. Morbi elementum dolor in nisl pulvinar eleifend. Suspendisse luctus, sem placerat tempus egestas, nisl ligula dictum arcu, ut venenatis quam ante ornare est. Duis risus turpis, pellentesque nec cursus sed, fringilla sit amet mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse nec commodo odio, in eleifend massa. Nullam in varius leo, at tristique nulla. Cras lobortis diam at neque dapibus, eget ultricies erat pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc congue pellentesque mi, id gravida dui placerat sed. Donec eget elementum orci. Maecenas interdum nibh et facilisis aliquam. Quisque malesuada tellus quis ipsum sodales, mattis commodo magna eleifend. In accumsan orci eu bibendum facilisis. Nulla varius est et iaculis aliquet. Maecenas vulputate rutrum tristique. Nunc porttitor iaculis elementum. Ut vulputate dui id lacinia placerat. Nullam ac lobortis enim. Nullam efficitur, ante non lacinia feugiat, mi leo volutpat augue, et efficitur nulla orci sed enim. Curabitur pulvinar, neque non tristique congue, ante mauris varius est, vel pulvinar enim sapien in neque. Nulla semper tortor odio, euismod molestie nisl condimentum eu. Curabitur a ipsum nunc. Quisque a lectus vulputate, aliquam ex et, blandit elit. Fusce malesuada ultricies commodo. Proin mauris arcu, pretium ac nunc in, aliquam consectetur libero. Duis rhoncus, massa vel egestas congue, augue orci cursus ex, fringilla pretium leo felis ut elit."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1467357689433-255655dbce4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam molestie ligula eget erat pellentesque, in mattis tortor sodales. Nullam id nisi lorem. Etiam dictum est at justo consequat, auctor molestie nulla luctus. Morbi elementum dolor in nisl pulvinar eleifend. Suspendisse luctus, sem placerat tempus egestas, nisl ligula dictum arcu, ut venenatis quam ante ornare est. Duis risus turpis, pellentesque nec cursus sed, fringilla sit amet mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse nec commodo odio, in eleifend massa. Nullam in varius leo, at tristique nulla. Cras lobortis diam at neque dapibus, eget ultricies erat pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc congue pellentesque mi, id gravida dui placerat sed. Donec eget elementum orci. Maecenas interdum nibh et facilisis aliquam. Quisque malesuada tellus quis ipsum sodales, mattis commodo magna eleifend. In accumsan orci eu bibendum facilisis. Nulla varius est et iaculis aliquet. Maecenas vulputate rutrum tristique. Nunc porttitor iaculis elementum. Ut vulputate dui id lacinia placerat. Nullam ac lobortis enim. Nullam efficitur, ante non lacinia feugiat, mi leo volutpat augue, et efficitur nulla orci sed enim. Curabitur pulvinar, neque non tristique congue, ante mauris varius est, vel pulvinar enim sapien in neque. Nulla semper tortor odio, euismod molestie nisl condimentum eu. Curabitur a ipsum nunc. Quisque a lectus vulputate, aliquam ex et, blandit elit. Fusce malesuada ultricies commodo. Proin mauris arcu, pretium ac nunc in, aliquam consectetur libero. Duis rhoncus, massa vel egestas congue, augue orci cursus ex, fringilla pretium leo felis ut elit."
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1516013894828-b214a58fdba7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam molestie ligula eget erat pellentesque, in mattis tortor sodales. Nullam id nisi lorem. Etiam dictum est at justo consequat, auctor molestie nulla luctus. Morbi elementum dolor in nisl pulvinar eleifend. Suspendisse luctus, sem placerat tempus egestas, nisl ligula dictum arcu, ut venenatis quam ante ornare est. Duis risus turpis, pellentesque nec cursus sed, fringilla sit amet mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse nec commodo odio, in eleifend massa. Nullam in varius leo, at tristique nulla. Cras lobortis diam at neque dapibus, eget ultricies erat pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc congue pellentesque mi, id gravida dui placerat sed. Donec eget elementum orci. Maecenas interdum nibh et facilisis aliquam. Quisque malesuada tellus quis ipsum sodales, mattis commodo magna eleifend. In accumsan orci eu bibendum facilisis. Nulla varius est et iaculis aliquet. Maecenas vulputate rutrum tristique. Nunc porttitor iaculis elementum. Ut vulputate dui id lacinia placerat. Nullam ac lobortis enim. Nullam efficitur, ante non lacinia feugiat, mi leo volutpat augue, et efficitur nulla orci sed enim. Curabitur pulvinar, neque non tristique congue, ante mauris varius est, vel pulvinar enim sapien in neque. Nulla semper tortor odio, euismod molestie nisl condimentum eu. Curabitur a ipsum nunc. Quisque a lectus vulputate, aliquam ex et, blandit elit. Fusce malesuada ultricies commodo. Proin mauris arcu, pretium ac nunc in, aliquam consectetur libero. Duis rhoncus, massa vel egestas congue, augue orci cursus ex, fringilla pretium leo felis ut elit."
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, err => {
         if(err) {
             console.log(err);
         }
         console.log("Removed campgrounds!");
         Comment.deleteMany({}, err => {
             if(err) {
                 console.log(err);
             }
             console.log("Removed comments!");
              //add a few campgrounds
             data.forEach(seed => {
                 Campground.create(seed, (err, campground) => {
                     if(err) {
                         console.log(err)
                     } else {
                         console.log("Added a campground!");
                         //create a comment
                         Comment.create(
                             {
                                 text: "This place is great, but I wish there was internet",
                                 author: "Homer"
                             }, (err, comment) => {
                                 if(err){
                                     console.log(err);
                                 } else {
                                     campground.comments.push(comment);
                                     campground.save();
                                     console.log("Created new comment");
                                 }
                             });
                     }
                 });
             });
         });
     }); 
}
  
 module.exports = seedDB;