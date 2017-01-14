/**
 * Created by qianqing on 2016/12/24.
 */
'use strict';
let wx = {
  dev: {
    "appId": "wxf6abf1959487c290",
    "secret": "abeda000c3a0f66f7f026b6be5e124dd",
    "redirect_outh": "http://wx.webui.info/wx/oauth-url"
  },
  pro: {
    "appId": "wx2d41a2b148345456",
    "secret": "324ef84d7d07e21827945f1327347341",
    "redirect_outh": "http://ssh5.myun.info/wx/oauth-url"
  }
}

module.exports = process.env.NODE_ENV === 'debug' ? wx.dev:wx.pro;
