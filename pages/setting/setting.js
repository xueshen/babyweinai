//logs.js
var util = require('../../utils/util.js')
var repository = require('../../utils/repository.js');
var recordStartX = 0;
var currentOffsetX = 0;
Page({
  data: {
    customTypes: []
  },
  onShow: function () {
    var types = repository.getCustomTypes();
    types.forEach((i) => {
      i.offsetX = 0;
    });
    this.setData({
      customTypes: types
    })
  },
  touchStart: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(e.target.dataset);
    console.log(e.currentTarget.dataset);

    console.log(index);
    if (index === undefined) {
      return;
    }

    recordStartX = e.touches[0].clientX;
    var item = this.data.customTypes[index];
    if (item['offsetX'] === undefined) {
      item.offsetX = 0;
    }
    currentOffsetX = item.offsetX;
    console.log('start x ', recordStartX);
  }
  ,
  touchMove: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if (index === undefined) {
      return;
    }

    var customTypes = this.data.customTypes;
    var item = customTypes[index];
    var x = e.touches[0].clientX;
    var mx = recordStartX - x;
    console.log('move x ', mx);

    var result = currentOffsetX - mx;
    if (result >= -80 && result <= 0) {
      item.offsetX = result;
    }
    this.setData({
      customTypes: customTypes
    });
  }
  ,
  touchEnd: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if (index === undefined) {
      return;
    }

    var customTypes = this.data.customTypes;
    var item = customTypes[index];
    console.log('end x ', item.offsetX);

    if (item.offsetX < -40) {
      item.offsetX = -80;

    } else {
      item.offsetX = 0;

    }
    this.setData({
      customTypes: customTypes
    });
  },
  deleteTypeEvent: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if (index === undefined) {
      return;
    }

    var types = repository.getCustomTypes();
    types.splice(index, 1);
    repository.saveCustomTypes(types, (r) => {
      if (r.success) {
        that.setData({
          customTypes: types
        });
      }
    })
  }

})
