/**
 * sekigae.printName.js
 * sekigae名前表示モジュール 
 */
/*jslint          browser : true, continue : true,
   devel  : true, indent  : 2,    maxerr   : 50,
   newcap : true, nomen   : true, plusplus : true,
   regexp : true, sloppy  : true, vars     : false,
   white  : true
 */
/*global $, sekigae */


'use strict';

sekigae.printName = (() => {

  const configMap = {
    NINZU : 25
  }

  const stateMap = {
    $container : null,
    isShowPrintNameArea : false,
    name : new Array()
  }

  let jqueryMap = {}

  // let name = new Array()
  
  const setJqueryMap = () => {
    jqueryMap = {
      $print_name_area : stateMap.$container
    }
  }

  // localStorageから値を取得
  const loadName = () => {
    const jsonName = localStorage.getItem( 'nameJson' )
    const name = JSON.parse( jsonName )
    // console.log("printName - loadName")
    // console.log( name )
    return name
  }

  // DOM操作
  const setPrintNameArea = () => {
    // console.log("printName - setPrintNameArea")
    // console.log( stateMap.name )
    
    let disp_name_html = String();
    
    for (let i = 0; i < configMap.NINZU; i++) {
      const make_html = ( () => {
        return ( () => {
          const text =
            '<div class="name">' + (i+1).toString() + ": " +
            stateMap.name[i] + '</div>';
          return text
        })
      })()
      disp_name_html = disp_name_html + make_html()
    }
    jqueryMap.$print_name_area.html( disp_name_html )

  }

  const togglePrintNameArea = ( isShow ) => {
    if ( isShow ) {
      jqueryMap.$print_name_area.css( 'display', 'none' )
      stateMap.isShowPrintNameArea = false
    }
    else {
      jqueryMap.$print_name_area.css( 'display', 'block' )
      stateMap.isShowPrintNameArea = true
    }
  }

  // ユーティリティ
  const setNINZU = ( ninzu ) => {
    configMap.NINZU = ninzu
    // setPrintNameArea()
  }

  // イベントハンドラ
  const onClickPrintName = (e) => {
    stateMap.name = loadName()
    // console.log("printName.js:")
    // console.log( stateMap.name )
    togglePrintNameArea( stateMap.isShowPrintNameArea )
    setPrintNameArea()
    return false
  }

  const initModule = ( $target ) => {
    stateMap.$container = $target
    setJqueryMap()
    return true
  }

  return {
    initModule : initModule,
    onClickPrintName : onClickPrintName,
    setNINZU : setNINZU
  }
  
})()

// 修正時刻: Sat Aug 29 11:37:28 2020
