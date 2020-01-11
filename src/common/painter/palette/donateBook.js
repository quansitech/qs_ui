const baseUrl = 'https://mutian.t4tstudio.com/Public/img/';
export default class LastMayday {
  palette() {
    return ({
      width: '620rpx',
      height: '938rpx',
      background: '#fff',
      views: [
        _image(baseUrl + 'drawBg.png',620,492,0,0),
        _image(baseUrl + 'drawFlower.png',620,424,0,514),
        _image(baseUrl + 'logo.png',239,58,80,796),
        _image('../../static/img/left-unit.png',23,21,34,536),
        _image('../../static/img/right-unit.png',23,21,561,686),
        _image('',172,172,368,736),
        {
          type: "text",
          text: '无名',
          id: "user-name",
          css: {
            top: "553rpx",
            left: "78rpx",
            color: "#059ade",
            fontSize: "36rpx"
          }
        },
        {
          type: 'text',
          text: '邀你一起',
          css: {
            top: '557rpx',
            left: ['100rpx', 'user-name'] ,
            color: '#333',
            fontSize: '30rpx'
          }
        },
        _text('捐赠童书，助力乡村少年阅读成长，', 616, '#333',30),
        _text('让每位少年都有向上生长的机会。',666 ,'#333',30),
      ],
    });
  }
}

const startTop = 553;
const startLeft = 80;
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
