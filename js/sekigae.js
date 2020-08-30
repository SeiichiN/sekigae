/**
 * sekigae.js
 * ルート名前空間モジュール 
 */
/*jslint          browser : true, continue : true,
   devel  : true, indent  : 2,    maxerr   : 50,
   newcap : true, nomen   : true, plusplus : true,
   regexp : true, sloppy  : true, vars     : false,
   white  : true
 */
/*global $, sekigae:true */

const sekigae = ( () => {
  const initModule = ($container) => {
    sekigae.shell.initModule( $container )
  }

  return { initModule: initModule }
})()

/* 修正時刻: Fri Aug 28 16:24:22 2020 */
