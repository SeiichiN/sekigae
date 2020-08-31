/**
 * sekigae.shuffle.js
 * sekigae名前シャッフルモジュール 
 */
/*jslint          browser : true, continue : true,
   devel  : true, indent  : 2,    maxerr   : 50,
   newcap : true, nomen   : true, plusplus : true,
   regexp : true, sloppy  : true, vars     : false,
   white  : true
 */
/*global $, sekigae */


'use strict';

sekigae.shuffle = (() => {

  const configMap = {
    NINZU : 25,
    SPEED : 20
  }

  const stateMap = {
    $container : null,
    showShuffleArea : false,
    isShuffle : false,
    name : new Array(),
    shuffleStart : null
  }

  let jqueryMap = {}

  // let name = new Array()
  
  const setJqueryMap = () => {
    jqueryMap = {
      $shuffle_name_area : stateMap.$container,
      $shuffle_start_btn : null,
      $shuffle_stop_btn : null
    }
  }

  // DOM操作
  const setShuffleNameArea = () => {
    let disp_name_html = '<ol>'

    for (let i = 0; i < configMap.NINZU; i++) {
      disp_name_html = disp_name_html + '<li></li>'
    }
    disp_name_html = disp_name_html + '</ol>' +
                     '<button class="shuffle-start-btn">シャッフル開始</button>' +
                     '<button class="shuffle-stop-btn">シャッフル停止</button>';

    jqueryMap.$shuffle_name_area.html( disp_name_html )
    jqueryMap.$li = jqueryMap.$shuffle_name_area.find('li')
    jqueryMap.$shuffle_start_btn = $('.shuffle-start-btn')
    jqueryMap.$shuffle_start_btn.on( 'click', onClickShuffleStart )
    jqueryMap.$shuffle_stop_btn = $('.shuffle-stop-btn')
    jqueryMap.$shuffle_stop_btn.on( 'click', onClickShuffleStop )
  }

  // 上記で作成した disp_name_html の中に 名列を表示する。
  const printName = () => {
    for (let i = 0; i < configMap.NINZU; i++) {
      // $('li').eq(i).text( stateMap.name[i] )
      jqueryMap.$li.eq(i).text( stateMap.name[i] )
      console.log( stateMap.name[i])
    }
  }
  
      
  // showShuffleAreaが true なら 名前の表示を消して false にする。
  // showShuffleAreaが false なら 名前を表示して true にする。
  const toggleShuffleArea = ( showShuffleArea ) => {
    // console.log(showShuffleArea)
    if ( showShuffleArea ) {
      saveName()
      jqueryMap.$shuffle_name_area.css( 'display', 'none' )
      stateMap.showShuffleArea = false
    }
    else {
      jqueryMap.$shuffle_name_area.css( 'display', 'block' )
      printName()
      stateMap.showShuffleArea = true
    }
  }

  // 配列をシャッフルする
  const shuffleName = () => {
    stateMap.name = shuffle ( stateMap.name )
  }

  /***************************************************************
   * ユーティリティ
   */
  // NINZU を調整する(オプション)
  const setNINZU = ( ninzu ) => {
    configMap.NINZU = ninzu
    setShuffleNameArea()
  }

  // localStorageから値を取得
  const loadName = () => {
    const jsonName = localStorage.getItem( 'nameJson' )
    if (jsonName != null && jsonName != undefined)
      stateMap.name = JSON.parse( jsonName )
    // console.log( stateMap.name )
  }

  // localStorageに値を保存
  const saveName = () => {
    const setjson = JSON.stringify( stateMap.name )
    localStorage.setItem( 'nameJson', setjson )
  }

  // 配列をシャッフルする
  const shuffle = ( array ) => {
    for (let i = array.length - 1; i> 0; i--) {
      let r = Math.floor( Math.random() * (i + 1))
      let tmp = array[i]
      array[i] = array[r]
      array[r] = tmp
    }
    return array
  }

  /***************************************************************
   * イベントハンドラ
   */
  const onClickShuffleArea = (e) => {
    toggleShuffleArea( stateMap.showShuffleArea )
    return false
  }

  const onClickShuffleStart = (e) => {
    stateMap.isShuffle = true
    stateMap.shuffleStart = setInterval( () => {
      shuffleName()
      printName()
    }, configMap.SPEED )
    return false
  }

  const onClickShuffleStop = (e) => {
    stateMap.isShuffle = false
    clearInterval( stateMap.shuffleStart )
    printName()
    return false
  }
  
  /***************************************************************
   * 初期設定
   */
  const initModule = ( $target ) => {
    stateMap.$container = $target
    setJqueryMap()
    loadName()
    setShuffleNameArea()
    return true
  }

  return {
    initModule : initModule,
    onClickShuffleArea : onClickShuffleArea,
    setNINZU : setNINZU
  }
  
})()


// 修正時刻: Mon Aug 31 19:05:21 2020
