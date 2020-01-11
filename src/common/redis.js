var redis= "redis" 
/**
 * 设置
 * k 键key
 * v 值value
 * t 秒
 */
function put(k, v, t) {
  uni.setStorageSync(k, v)
  var seconds = parseInt(t)
  if (seconds > 0) {
    var newtime = Date.parse(new Date())
    newtime = newtime / 1000 + seconds;
    uni.setStorageSync(k + redis, newtime + "")
  } else {
    uni.removeStorageSync(k + redis)
  }
}


/**
 * 获取
 * k 键key
 */
function get(k) {
  var deadtime = parseInt(uni.getStorageSync(k + redis))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      uni.removeStorageSync(k);
      console.log("过期了")
      return null
    }
  }
  var res=uni.getStorageSync(k)
  if(res){
    return res
  }else{
    return null
  }
}
 
/**
 * 删除
 */
function remove(k) {
  uni.removeStorageSync(k);
  uni.removeStorageSync(k + redis);
}
 
/**
 * 清除所有key
 */
function clear() {
  uni.clearStorageSync();
}
module.exports={
  put,
  get,
  remove,
  clear
}
