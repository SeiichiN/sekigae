/**
 * sekigae.shell.js
 * sekigaeシェルモジュール 
 */
/*jslint          browser : true, continue : true,
   devel  : true, indent  : 2,    maxerr   : 50,
   newcap : true, nomen   : true, plusplus : true,
   regexp : true, sloppy  : true, vars     : false,
   white  : true
 */
/*global $, sekigae */


'use strict';

sekigae.shell = (() => {

  const configMap = {
    NINZU : 5,                // default 25
    
    base_html : String() +
                '<div class="menu">' +
                '<button class="sekigae-shell-input-name-btn">名前入力</button>' +
                '<button class="sekigae-shell-print-name-btn">名前表示</button>' +
                '<button class="sekigae-shell-shuffle-btn">シャッフル</button>' +
                '<button class="sekigae-shell-config-btn">設　定</button>' +
                '</div>' +
                '<div class="sekigae-shell-input-name-area"></div>' +
                '<div class="sekigae-shell-print-name-area"></div>' +
                '<div class="sekigae-shell-shuffle-name-area"></div>' +
                '<div class="sekigae-shell-config-area"></div>',

  }

  let jqueryMap = {}

  const stateMap = {
    $container : null,
    isShuffle : false,
    isPrint : false,
    isInput : false,
    isConfig : false
  }

  const setJqueryMap = () => {
    const $container = stateMap.$container
    
    jqueryMap = {
      $container : $container,
      $input_name_btn : $container.find( '.sekigae-shell-input-name-btn' ),
      $input_name_area : $container.find('.sekigae-shell-input-name-area'),
      $print_name_area : $container.find('.sekigae-shell-print-name-area'),
      $print_name_btn : $container.find('.sekigae-shell-print-name-btn'),
      $shuffle_name_area : $container.find('.sekigae-shell-shuffle-name-area'),
      $shuffle_btn : $container.find('.sekigae-shell-shuffle-btn'),
      $config_area : $container.find('.sekigae-shell-config-area'),
      $config_btn : $container.find('.sekigae-shell-config-btn')
    }
  }

  // ユーティリティ
  // もし、localStorage に ninzu が保存されていたら、それを読み込む
  const loadNinzu = () => {
    if (localStorage.getItem( 'ninzuJson' ) !== null) {
      const jsonNinzu = localStorage.getItem( 'ninzuJson' )
      configMap.NINZU = JSON.parse( jsonNinzu )
    }
  }

  // DOM操作
  
  // イベントハンドラー
  const changeShuffleBtnText = () => {
    console.log(stateMap.isShuffle)
    if (stateMap.isShuffle) {
      jqueryMap.$shuffle_btn.text( "シャッフル" )
      stateMap.isShuffle = false
    }
    else {
      jqueryMap.$shuffle_btn.text( "　閉じる　" )
      stateMap.isShuffle = true
    }
    return false
  }

  const changePrintNameText = () => {
    if (stateMap.isPrint) {
      jqueryMap.$print_name_btn.text( "名前表示" )
      stateMap.isPrint = false
    }
    else {
      jqueryMap.$print_name_btn.text( "閉 じ る" )
      stateMap.isPrint = true
    }
    return false
  }
  
  const changeInputNameText = () => {
    if (stateMap.isInput) {
      jqueryMap.$input_name_btn.text( "名前入力" )
      stateMap.isInput = false
    }
    else {
      jqueryMap.$input_name_btn.text( "閉 じ る" )
      stateMap.isInput = true
    }
    return false
  }
  
  const changeConfigBtnText = () => {
    if (stateMap.isConfig) {
      // jqueryMap.$config_area.empty()
      jqueryMap.$config_btn.text( "設　定" )
      stateMap.isConfig = false
    }
    else {
      // jqueryMap.$config_area.html( configMap.config_html )
      // jqueryMap.$config_area.find( '.config-ninzu' ).text( configMap.NINZU )
      jqueryMap.$config_btn.text( "閉じる" )
      stateMap.isConfig = true
    }
    return false
  }
  
  // イベントハンドラ

  const initModule = ( $container ) => {
    stateMap.$container = $container
    $container.html( configMap.base_html )
    setJqueryMap()
    loadNinzu()  // localStorageに人数が保存されているかチェック

    // sekigae.inputName.js
    sekigae.inputName.initModule( jqueryMap.$input_name_area )
    jqueryMap.$input_name_btn.on( 'click', sekigae.inputName.onClickInputName )
    jqueryMap.$input_name_btn.on( 'click', changeInputNameText )
    sekigae.inputName.setNINZU( configMap.NINZU )

    // sekigae.printName.js
    sekigae.printName.initModule( jqueryMap.$print_name_area )
    jqueryMap.$print_name_btn.on( 'click', sekigae.printName.onClickPrintName )
    jqueryMap.$print_name_btn.on( 'click', changePrintNameText )
    sekigae.printName.setNINZU( configMap.NINZU )

    // sekigae.shuffle.js
    sekigae.shuffle.initModule( jqueryMap.$shuffle_name_area )
    jqueryMap.$shuffle_btn.on( 'click', sekigae.shuffle.onClickShuffleArea )
    jqueryMap.$shuffle_btn.on( 'click', changeShuffleBtnText )
    sekigae.shuffle.setNINZU( configMap.NINZU )

    // sekigae.config.js
    sekigae.config.initModule( jqueryMap.$config_area )
    jqueryMap.$config_btn.on( 'click', sekigae.config.onClickConfigBtn )
    jqueryMap.$config_btn.on( 'click', changeConfigBtnText )
    sekigae.config.setNINZU( configMap.NINZU )
  }

  return { initModule : initModule }
})()



// 修正時刻: Sun Aug 30 08:25:06 2020

