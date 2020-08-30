/**
 * sekigae.config.js
 * sekigae設定モジュール 
 */
/*jslint          browser : true, continue : true,
   devel  : true, indent  : 2,    maxerr   : 50,
   newcap : true, nomen   : true, plusplus : true,
   regexp : true, sloppy  : true, vars     : false,
   white  : true
 */
/*global $, sekigae */


'use strict';

sekigae.config = (() => {

  const configMap = {
    NINZU : 25,

    config_html : String() +
                  '<form name="config-form">' +
                  '<div class="config-area">人数:' +
                  '<input name="config-ninzu" class="config-ninzu">' +
                  '</div>' +
                  '<button type="submit" class="sekigae-shell-config-area-change-btn">変更</button>' +
                  '</form>'
    
  }

  let jqueryMap = {}

  const stateMap = {
    $container : null,
    isConfig : false
  }

  const setJqueryMap = () => {
    jqueryMap = {
      $config_area : stateMap.$container,
      $config_btn : stateMap.$container.find('.sekigae-shell-config-btn'),
    }
  }

  /**
   * ユーティリティ
   */
  // NINZU を調整する(オプション)
  const setNINZU = ( ninzu ) => {
    configMap.NINZU = ninzu
  }

  const saveNinzu = ( ninzu ) => {
    const setjson = JSON.stringify( ninzu )
    localStorage.setItem( 'ninzuJson', setjson )
  }

  // イベントハンドラ
  const onClickConfigBtn = () => {
    if (stateMap.isConfig) {
      jqueryMap.$config_area.css( 'display', 'none' )
      stateMap.isConfig = false
    }
    else {
      jqueryMap.$config_area.css( 'display', 'block' )
      jqueryMap.$config_area.find( '.config-ninzu' ).val( configMap.NINZU )
      jqueryMap.$change_btn = jqueryMap.$config_area.find( '.sekigae-shell-config-area-change-btn' )
      jqueryMap.$change_btn.on( 'click', onClickChangeBtn )
      stateMap.isConfig = true
    }
    return false
  }

  const onClickChangeBtn = (e) => {
    // console.log("CLICK")
    const ninzu = $('input[name="config-ninzu"]').val()
    saveNinzu( ninzu )
    return true
  }

  const initModule = ( $target ) => {
    stateMap.$container = $target
    setJqueryMap()
    jqueryMap.$config_area.html( configMap.config_html )
  }

  return {
    initModule : initModule,
    onClickConfigBtn : onClickConfigBtn,
    setNINZU : setNINZU
  }
})()

// 修正時刻: Sun Aug 30 11:30:42 2020

