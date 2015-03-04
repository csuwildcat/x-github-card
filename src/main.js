(function(){  

  var url = 'https://api.github.com/users/';

  function json(j, user, callback) {
    xhr = new window.XMLHttpRequest();
    xhr.open('GET', j + user, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
      status = xhr.status;
        if ((status >= 200 && status < 300) || status === 304 || status === 0) {
          callback(JSON.parse(xhr.response || xhr.responseText));
        }
      }
    };
    xhr.send();
  }

  xtag.register('x-github-card', {
    content: function(){/*
      <article class="user">
        <dl class="user-data">
          <dt>Avatar:</dt>
          <dd class="user-avatar">
            <img class="avatar-img" />
          </dd>
          <dt>Fullname:</dt>
          <dd class="user-name"></dd>
          <dt>Account:</dt>
          <dd class="user-account"></dd>
        </dl>
        <dl class="user-stats">
          <dt>Repos</dt>
          <dd data-stats="repos" class="user-repos"></dd>
          <dt>Followers</dt>
          <dd data-stats="followers" class="user-followers"></dd>
        </dl>
      </article>
    */},
    accessors: {
      user: {
        attribute: {}, // don't need to specify the name, it's automatically linked
        // don't need to specify a 'get' function, as this is already linked as well
        set: function(val){ // you probably want to switch the card when the 'user' attr is changed
          var card = this;
          json(url, val, function(response) {
            card.querySelector('.user-name').innerHTML = response.name;
            card.querySelector('.avatar-img').setAttribute('src', response.avatar_url);
            card.querySelector('.user-account').innerHTML = response.login;
            card.querySelector('.user-repos').innerHTML = response.public_repos;
            card.querySelector('.user-followers').innerHTML = response.followers;
          });
        }
      }
    }
  });

})();
