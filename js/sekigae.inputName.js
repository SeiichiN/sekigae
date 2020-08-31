/**
 * sekigae.inputName.js
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

sekigae.inputName = (() => {

  const configMap = {
    NINZU : 25,
  }

  let jqueryMap = {}

  const stateMap = {
    isShowInputNameArea : false
  }

  const setJqueryMap = () => {
    jqueryMap = {
      $input_name_area : null,
      $submit_btn : null
    }
  }

  // DOM操作
  const setInputNameArea = () => {
    let text = '<ol>'
    
    for ( let i = 0; i < configMap.NINZU; i++ ) {
      text = text +
             '<li>' + 
             '<input type="text" name="name_' + i + '">' +
             '</li>'
    }
    text = text + '</ol>'
    const input_html =
      '<form class="sekigae-shell-input-name-form" method="get">' +
      text +
      '<button type="submit" class="sekigae-shell-input-name-submit-btn">中断・終了</button>' +
      '</form>';

    jqueryMap.$input_name_area.html( input_html )
    jqueryMap.$submit_btn = $('.sekigae-shell-input-name-submit-btn')
    jqueryMap.$submit_btn.on( 'click', onSubmitBtn )
  }

  const toggleInputNameArea = ( isShow ) => {
    if ( isShow ) {
      jqueryMap.$input_name_area.css( 'display', 'none' )
      stateMap.isShowInputNameArea = false
    }
    else {
      jqueryMap.$input_name_area.css( 'display', 'block' )
      stateMap.isShowInputNameArea = true
    }
    // console.log(stateMap)
  }

  /**
   * ユーティリティ
   */
  // 名前を保存
  const saveName = ( name ) => {
    const setjson = JSON.stringify( name )
    localStorage.setItem( 'nameJson', setjson )
  }

  // NINZU を調整
  const setNINZU = ( ninzu ) => {
    configMap.NINZU = ninzu
    setInputNameArea()
  }

  // デバッグ用
  const printName = () => {
    console.log( name )
  }

  /**
   * イベントハンドラ
   */
  //
  const onClickInputName = () => {
    // $('body').css('background-color', 'rgba(50, 50, 50, 0.5)')
    // $('#wrap').css('background-color', 'rgba(70, 70, 70, 0.7)')
    toggleInputNameArea( stateMap.isShowInputNameArea )
    return false
  }

  const onSubmitBtn = () => {
    const name = new Array()
    for ( let i = 0; i < configMap.NINZU; i++ ) {
      const name_data = `input[name="name_${i}"]`
      const name_text = $( name_data ).val()
      // console.log( name_text )
      name.push( name_text )
    }
    saveName( name )
    return false
  }
   
  
  // $target -- $('.sekigae-shell-input-name-area')
  const initModule = ( $target ) => {
    setJqueryMap()
    jqueryMap.$input_name_area = $target
    setInputNameArea()
    return true
  }

  return {
    initModule : initModule,
    onClickInputName : onClickInputName,
    setNINZU : setNINZU
  }
})()


// 修正時刻: Sat Aug 29 11:50:17 2020
