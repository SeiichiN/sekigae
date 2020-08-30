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
  }

  const stateMap = {
    $container : null,
    isShuffle : false,
    name : new Array()
  }

  let jqueryMap = {}

  // let name = new Array()
  
  const setJqueryMap = () => {
    jqueryMap = {
      $shuffle_name_area : stateMap.$container
    }
  }

  // localStorageから値を取得
  const getName = () => {
    const jsonName = localStorage.getItem( 'nameJson' )
    stateMap.name = JSON.parse( jsonName )
    // console.log( stateMap.name )
  }

  // localStorageに値を保存
  const saveName = (name) => {
    const setjson = JSON.stringify( name )
    localStorage.setItem( 'nameJson', setjson )
  }

  // DOM操作
  const setPrintNameArea = () => {
    let disp_name_html = '';
    
    for (let i = 0; i < configMap.NINZU; i++) {
      const make_html = ( () => {
        return ( () => {
          const text =
            '<div class="name" data-chaffle="ja">' + (i+1).toString() + ": " +
            stateMap.name[i] + '</div>';
          return text
        })
      })()
      disp_name_html = disp_name_html + make_html()
    }
    jqueryMap.$shuffle_name_area.html( disp_name_html )
  }

  const toggleShuffleMode = ( isShuffle ) => {
    // console.log(isShuffle)
    if ( isShuffle ) {
      jqueryMap.$shuffle_name_area.css( 'display', 'none' )
      stateMap.isShuffle = false
    }
    else {
      jqueryMap.$shuffle_name_area.css( 'display', 'block' )
      stateMap.isShuffle = true
    }
    shuffleName()
  }

  const shuffleName = () => {
    if (stateMap.isShuffle) {
      const _name = shuffle ( stateMap.name )
      console.log( _name )
      saveName( _name )
      setPrintNameArea()
    }
  }

  /**
   * ユーティリティ
   */
  // NINZU を調整する(オプション)
  const setNINZU = ( ninzu ) => {
    configMap.NINZU = ninzu
    setPrintNameArea()
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

  // イベントハンドラ
  const onClickShuffleMode = (e) => {
    toggleShuffleMode( stateMap.isShuffle )
    return false
  }

  const initModule = ( $target ) => {
    stateMap.$container = $target
    setJqueryMap()
    getName()
    setPrintNameArea()
    return true
  }

  return {
    initModule : initModule,
    onClickShuffleMode : onClickShuffleMode,
    setNINZU : setNINZU
  }
  
})()

// 修正時刻: Sun Aug 30 08:11:36 2020
