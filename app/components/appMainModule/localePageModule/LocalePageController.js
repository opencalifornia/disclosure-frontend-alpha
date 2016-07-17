'use strict';

  /**
   * @ngdoc controller
   * @name localePageModule:LocalePageController
   *
   * @description
   *
   *
   * @requires $scope
   * */

  // function LocalePageController($log, $state, localePageService) {
  function LocalePageController($log, $state, $stateParams, localePageFactory) {
    var pageMetaData = {};
    var rawBallotData = {};
    var ballotList = {};
    ballotList.offices = [];
    ballotList.measures = [];

    var locale = this;
    locale.state = $state;
    // locale.localeName = $state.params.localeName;
    // locale.localeId = $state.params.localeId;
    locale.localeName = $stateParams.localeName;
    locale.localeId = $stateParams.localeId;
    locale.testType = localePageFactory.getLocalePageData(locale.localeId).type;

    console.log('TEST TYPE = ', locale.testType);


    // locale.localeName = localePageService.localeName;


    // locale.localeType = locale.state.localeType;
    // locale.localeType = pageMetaData.localeType;

    // if (locale.localeType === '' || null || undefined) {
    //   console.log('manually loading data');
    //   locale.manuallyLoadMetaData(locale.localeId);
    // }

    activate();

    function activate() {
    // locale.activate = function() {
    //   return localePageFactory.getMetaDateForPage(locale.localeId)
      return localePageFactory.getLocalePageData(locale.localeId)
        .then(function(data) {
          pageMetaData = data;
          // locale.localeType = pageMetaData.localeType;
          locale.localeType = pageMetaData.type;
          $log.info('PAGE META DATA! = ', pageMetaData);
        });
    }
    //
    // locale.manuallyLoadMetaData = function(localeId) {
    //   return localePageFactory.getLocalePageData(localeId)
    //     .then(function(data) {
    //       pageMetaData = data;
    //       $log.info('PAGE META DATA! = ', pageMetaData);
    //     });
    // };
    // locale.localeType = localePageService.metaData.type;
    $log.info('LOCALE TYPE = ', locale.localeType);

    // function createBallotList(localeId) {
    createBallotList();
    function createBallotList() {
      return localePageFactory.getCurrentBallotData(locale.localeId)
        .then(function(data){
          rawBallotData = data;
          $log.info('RAW BALLOT DATA = ', rawBallotData);
          locale.nextElectionDate = rawBallotData.date;
          splitOfficesAndMeasures(rawBallotData.ballot_items);
          locale.ballotList = ballotList;
        });
    }

    function splitOfficesAndMeasures(arrayOfBallotData) {
      angular.forEach(arrayOfBallotData, function(contest) {
        var item = {};
        item = createBallotListItem(contest);

        if (contest.type == 'office') {
          ballotList.offices.push(item);
        } else {
          ballotList.measures.push(item);
        }
      });
      $log.info('ELECTION DATA = ', ballotList);
    }

    function createBallotListItem(contestObject) {
      var ballotListItem = {};
      ballotListItem.id = contestObject.id;
      ballotListItem.type = contestObject.type;
      ballotListItem.linkTitle = contestObject.name;
      ballotListItem.linkUrl = contestObject.name;
      ballotListItem.electionDate = rawBallotData.date;
      return ballotListItem;
    }

    // locale.onStateLoad = function(name, type, id) {
    //   var metaData = {};
    //   metaData.locale.name = name;
    //   return metaData;
    // }

    // locale.localeMeta = localePageService;
    // $log.info('LOCALE META = ', locale.localeMeta);

    locale.pageParams = $state.params;
    $log.info('LOCALE META = ', locale.pageParams);

    // locale.pageData = $stateParams;
    locale.pageData = $state.current;
    $log.info('LOCALE PAGE DATA = ', locale.pageData);

    // locale.pageElement = '<' + locale.localeType + '-page><' + '/' + locale.localeType + '-page>';

    // locale.localeName = localeName;
    // // locale.localeName = localePageService.localeName;
    // $log.info('LOCALE NAME = ', locale.localeName);

    // function getAlamedaData() {
  }

  LocalePageController.$inject = ['$log', '$state', '$stateParams', 'localePageFactory'];
  // LocalePageController.$inject = ['$log', '$state', 'localePageService'];
  module.exports = LocalePageController;
