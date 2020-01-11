const baseUrl = 'https://mutian.t4tstudio.com/Public/img/';
export default class LastMayday {
  palette() {
    return ({
      width: '620rpx',
      height: '770rpx',
      background: '#fff',
      views: [
        _image(baseUrl + 'donateFinishBg.png',620,770,0,0),
        _image(baseUrl + 'donateFinishFlower.png',164,267,461,507),
        _image(baseUrl + 'logo.png',208,51,62,95),
        // {
        //   type: "text",
        //   text: '无名',
        //   id: "user-name",
        //   css: {
        //     top: "553rpx",
        //     left: "78rpx",
        //     color: "#059ade",
        //     fontSize: "36rpx"
        //   }
        // },
        // {
        //   type: 'text',
        //   text: '邀你一起',
        //   css: {
        //     top: '557rpx',
        //     left: ['100rpx', 'user-name'] ,
        //     color: '#333',
        //     fontSize: '30rpx'
        //   }
        // },
        _text('您的善意流转，让乡村少年因阅读', 333, '#816125',28),
        _text('而拥抱更多可能性。谢谢您！',383 ,'#816125',28),
        _relative('幕天公益',401,553,'#816125',30),
        _relative('2019年12月14日',322,598,'#816125',26)
      ],
    });
  }
}

const startTop = 333;
const startLeft = 100;
const gapSize = 70;
const common = {
  left: `${startLeft}rpx`,
//   fontSize: '40rpx',
};

function _text(text,y, color, fontSize,id) {
  return ({
    type: 'text',
    text: text,
    css: [{
      top: `${y}rpx`,
      color: color,
      fontSize: `${fontSize}rpx`
    }, common],
  });
}
function _relative(text,x,y,color,fontSize) {
  return ({
    type: 'text',
    text: text,
    css: [{
      top: `${y}rpx`,
      left: `${x}rpx`,
      color: color,
      fontSize: `${fontSize}rpx`
    }],
  });
}

function _image(url,w,h,x,y,borderRadius) {
  return (
    {
      type: 'image',
      url: url,
      css: {
        top: `${y}rpx`,
        left: `${x}rpx`,
        width: `${w}rpx`,
        height: `${h}rpx`,
        borderRadius: borderRadius,
      },
    }
  );
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '22rpx',
      top: `${startTop + 8.5 * gapSize + 140}rpx`,
    },
  };
  if (index === 3) {
    des.css.right = '60rpx';
  } else {
    des.css.left = `${startLeft + 120 * index + 30}rpx`;
  }
  return des;
}
