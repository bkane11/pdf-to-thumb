/*
*
*  This module requires ImageMagick and GhostScript be installed and available in PATH
*
*/

'use strict';

var im = require('imagemagick')
, fs = require('fs')
, inputPDF = './tests/inputs/grep.pdf'
// , inputPDF = './tests/inputs/UserManual.pdf'
, optionslist = [
	'-resize 500x500' // resize
	// , '-trim +repage' // remove whitespace around outside -- don't do this
 	, '-gravity center' // ensure centered
	, '-background white -alpha remove -flatten' // ensure white background
	// optimize rendereing
    , '-colorspace RGB +sigmoidal-contrast 11.6933'
 	, '-define filter:filter=Sinc'
 	, '-define filter:window=Jinc'
 	, '-define filter:lobes=3'
 	, '-sigmoidal-contrast 11.6933'
 	, '-colorspace sRGB'
 	// end optimize rendering
].join(' ').split(' ')
;

// -extent 500x500\
// -resize 50%\

function pdftoimage(inpath, outpath, callback){
	
	if(!inpath){
		inpath = inputPDF
		// replace `input` with `output` uand `pdf` with `jpg`
	}
	
	if(!outpath)
		outpath = inpath.replace('input', 'output').replace('pdf', 'jpg')
	
	// append the output filename to the end of the options list --
	optionslist.push( outpath )

	inpath += '[0]'; //first page only
	// prepend the input pdf filename to the options list
	optionslist.unshift(inpath)
	
	im.convert( optionslist , function(err, stdout){
		if(err){
			console.log( err );
			// return callback with err argument only
			return callback && callback(err)
		}
		
		console.log('success!')
		if(stdout)
			console.log('messages: ', stdout);
		// return callback with no err argument and with outpath where file was created
		return callback && callback(undefined, outpath)
	});
}


function afterConvert(err, stdout){
}

module.exports = pdftoimage;