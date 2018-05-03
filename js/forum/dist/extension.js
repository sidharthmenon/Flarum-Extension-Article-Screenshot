'use strict';

System.register('sidharthmenon/flarum-screenshot/main', ['flarum/extend', 'flarum/app', 'flarum/utils/PostControls', 'flarum/components/Button'], function (_export, _context) {
  "use strict";

  var extend, app, PostControls, Button;


  function saveImage(id, type) {

    var node = document.querySelectorAll("[data-id='" + id + "'][data-type='" + type + "']")[0];
    console.log(node);
    var aside = node.getElementsByTagName("aside")[0];
    console.log(aside);
    var menu = aside.getElementsByClassName("Dropdown-menu")[0];
    console.log(menu);
    aside.style.visibility = 'hidden';
    menu.style.visibility = 'hidden';

    var canvas = document.createElement("CANVAS");
    var context = canvas.getContext('2d');

    var img1 = new Image();

    domtoimage.toPng(node).then(function (dataUrl) {
      var img = new Image();
      img1.src = dataUrl;
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });

    var img2 = new Image();

    img1.onload = function () {
      if (img1.width > 500) {
        img2.src = app.forum.attribute('sidharthmenon.flarum-screenshot.img_wide');
      } else {
        img2.src = app.forum.attribute('sidharthmenon.flarum-screenshot.img_mobile');
      }
    };

    img2.onload = function () {
      canvas.width = img1.width + 20;
      canvas.height = Number(img1.height) + Number(img2.height) + 20;
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img1, 10, 10);
      context.drawImage(img2, 10, Number(img1.height) + 10);
      var blob = canvas.toBlob(function (blob) {
        window.saveAs(blob, "hello world.jpeg");
      });
      aside.style.visibility = 'visible';
      menu.style.visibility = 'visible';
    };
  }
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumUtilsPostControls) {
      PostControls = _flarumUtilsPostControls.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {

      app.initializers.add('flarum-screenshot', function () {
        extend(PostControls, 'moderationControls', function (items, post) {

          items.add('share', Button.component({
            children: "Share",
            icon: 'camera',
            onclick: function onclick() {
              var id = post.data.attributes.id;
              var type = post.data.attributes.contentType;
              saveImage(id, type);
            }
          }));
        });
      });
    }
  };
});