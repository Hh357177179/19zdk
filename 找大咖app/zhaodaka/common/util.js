const baseUrl = 'http://project.zhaodaka.cn/api'

// loading的封装
const sLoading = function () {
	uni.showLoading({
		title: '加载中...',
    mask: true
	});
}

// toast提示封装
const showMsg = function (msg) {
  uni.showToast({
    title: msg,
    mask: true,
    icon: "none"
  });
};

module.exports = {
	baseUrl: baseUrl,
	sLoading: sLoading,
	showMsg: showMsg
}