//'use strict';

module.exports = function(app) {
  var Person = app.models.customUser;
  var Post = app.models.eventReview;

  Person.find ({ where: { username: "Admin" }}, function (err, users) {
    if (users) {
      if (users.length < 1) {
        Person.create([
          { "username": "Admin", "name": "Admin", "email": "admin@mydomain.com", "password": "password" },
          { "username": "Foo", "name": "Foo", "email": "foo@mydomain.com", "password": "password" }
        ],
        function(err, users) {
          if (err) {
            throw err;
          }

         console.log('Created test users: ', users);

          Post.create({
            title: 'Show in BA',
            description: 'An amazing show in Buenos Aires',
            date: "2019-03-15",
            place: "Buenos Aires",
            owner: getPersonId(users, 'Foo'),
          }, function(err, post) {
            if (err) throw err;

            console.log('Created Post:', post);
          });

          // user.email = 'bar@foo.com';
          // user.save(function(saveErr, saveUser) {
          //   if (saveErr) {
          //     throw saveErr;
          //   }
          //   console.log('sample user saved\n', JSON.stringify(saveUser, null, '  '));
          // });

        });
      };
    };
  });

  getPersonId = function(users, username) {
    var output = null;
    if (!users) return output;
    for(var i = 0; i < users.length; i++) {
      if (users[i].username == username) {
        output = users[i].id;
      }
    }
    return output;
  }
}

//login with post in customUser:
// {"email":"admin@mydomain.com","password":"password"}

// to add custom-token and other login cappabilities look at
//https://ambrosioni.io/2017/04/12/how-to-customize-the-loopback-authentication-process/


//mongo "${DATABASE_URL}" 
// db.customUser.find();
// db.customUser.remove({});
