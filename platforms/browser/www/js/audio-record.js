






function getPhoneGapPath() {

    var path = window.location.pathname;
    path = path.substr( 0, path.length - 10 );
    return 'file://' + path;

};

