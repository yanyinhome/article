import wx from 'weixin-js-sdk';
function init_wechat(wxconfig,shareConfigs,shareLink) {
    wx.config({
        debug: false,
        appId: wxconfig.appid, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp:wxconfig.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxconfig.nonceStr, // 必填，生成签名的随机串
        signature:wxconfig.signature,// 必填，签名，见附录1
        //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
        jsApiList: [
            'onMenuShareAppMessage','onMenuShareTimeline',
            'onMenuShareQQ','onMenuShareQZone'
        ]
    })
    wx.ready(function (res) {
        wx.onMenuShareTimeline({
            title: shareConfigs.title, // 分享标题
            desc: shareConfigs.desc, // 分享描述
            link:shareLink, // 分享链接
            imgUrl: shareConfigs.imgUrl, // 分享图标
            success: function () {
                // alert("分享到朋友圈成功")
                this.$toast({
                    message: "成功分享到朋友圈"
                });
            },
            cancel: function () {
                // alert("分享失败,您取消了分享!")
                this.$toast({
                    message: "分享失败,您取消了分享!"
                });
            }
        });
        //微信分享菜单测试
        wx.onMenuShareAppMessage({
            title:shareConfigs.title, // 分享标题
            desc: shareConfigs.desc, // 分享描述
            link: shareConfigs.links, // 分享链接
            imgUrl:shareConfigs.imgUrl, // 分享图标
            success: function () {
                // alert("成功分享给朋友")
                this.$toast({
                    message: "成功分享给朋友"
                });
            },
            cancel: function () {
                // alert("分享失败,您取消了分享!")
                this.$toast({
                    message: "分享失败,您取消了分享!"
                });
            }
        });
        wx.error(function (res) {
            console.log(res)
        })
    })
}
/*window.isWxReady=false;
wx.ready(function (res) {
    console.log(res)
})*/
export const init=function (wxconfig,shareConfigs,link) {
    if(wxconfig && shareConfigs && link){
        init_wechat(wxconfig,shareConfigs,link)
    }
}
