/**
 * @author Filipe Caixeta / http://filipecaixeta.com.br
 * @author Mugen87 / https://github.com/Mugen87
 * @author Jeremy Gordon per fringeAI contract 4_7_2020 for bounding box
 *  / https://github.com/onejgordon
 *
 * Description: A THREE loader for PCD ascii and binary files.  Superimpose bounding boxes.
 *
 * Limitations: Compressed binary files are not supported.
 *
 */


import {
	BufferGeometry,
	BoxGeometry,
	Box3Helper,
	Vector3,
	DefaultLoadingManager,
	FileLoader,
	Float32BufferAttribute,
	LoaderUtils,
	Points,
	PointsMaterial,
	VertexColors,
	Box3,
	LineSegments,
	EdgesGeometry,
	LineBasicMaterial
} from "./three.module.js";
import { Lut } from './Lut.js';

var PCDLoaderWithROI = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
	this.littleEndian = true;

};


PCDLoaderWithROI.prototype = {

	constructor: PCDLoaderWithROI,

	load: function ( url, point_size, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.setResponseType( 'arraybuffer' );
		loader.load( url, function ( data ) {

			try {

				onLoad( scope.parse( data, url, point_size ) );

			} catch ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					throw e;

				}

			}

		}, onProgress, onError );

	},

	setPath: function ( value ) {

		this.path = value;
		return this;

	},

	random_in_range: function(min, max) {
		return (max-min) * Math.random() + min
	},

	parse: function ( data, url, point_size ) {
		// Parse & ROI parameters
		const SHOW_BB = true;
		const DOWNSAMPLE = 3;
		const WITH_ROIS = 2;
		// Color of points in any ROI
		const IN_BB_R = 1;
		const IN_BB_B = 0;
		const IN_BB_G = 0;
		const HIGHLIGHT_IN_BB = false;
		const COLOR_BY_HEIGHT = true;

		let rois = []
		if (WITH_ROIS > 0) {
			// Randomly generate n bounding boxes (to color points inside)
			for (let i=0; i<WITH_ROIS; i++) {
				let box = new Box3();
				let pos = new Vector3(
					this.random_in_range(-50, 50),
					this.random_in_range(-50, 50),
					0
				);
				let size = new Vector3(this.random_in_range(30, 50),this.random_in_range(30, 50), 30)
				box.setFromCenterAndSize(pos, size);
				rois.push(box)
			}
		}

		function parseHeader( data ) {
			var PCDheader = {};
			var result1 = data.search( /[\r\n]DATA\s(\S*)\s/i );
			var result2 = /[\r\n]DATA\s(\S*)\s/i.exec( data.substr( result1 - 1 ) );

			PCDheader.data = result2[ 1 ];
			PCDheader.headerLen = result2[ 0 ].length + result1;
			PCDheader.str = data.substr( 0, PCDheader.headerLen );

			// remove comments
			PCDheader.str = PCDheader.str.replace( /\#.*/gi, '' );

			// parse
			PCDheader.version = /VERSION (.*)/i.exec( PCDheader.str );
			PCDheader.fields = /FIELDS (.*)/i.exec( PCDheader.str );
			PCDheader.size = /SIZE (.*)/i.exec( PCDheader.str );
			PCDheader.type = /TYPE (.*)/i.exec( PCDheader.str );
			PCDheader.count = /COUNT (.*)/i.exec( PCDheader.str );
			PCDheader.width = /WIDTH (.*)/i.exec( PCDheader.str );
			PCDheader.height = /HEIGHT (.*)/i.exec( PCDheader.str );
			PCDheader.viewpoint = /VIEWPOINT (.*)/i.exec( PCDheader.str );
			PCDheader.points = /POINTS (.*)/i.exec( PCDheader.str );

			// evaluate

			if ( PCDheader.version !== null )
				PCDheader.version = parseFloat( PCDheader.version[ 1 ] );

			if ( PCDheader.fields !== null )
				PCDheader.fields = PCDheader.fields[ 1 ].split( ' ' );

			if ( PCDheader.type !== null )
				PCDheader.type = PCDheader.type[ 1 ].split( ' ' );

			if ( PCDheader.width !== null )
				PCDheader.width = parseInt( PCDheader.width[ 1 ] );

			if ( PCDheader.height !== null )
				PCDheader.height = parseInt( PCDheader.height[ 1 ] );

			if ( PCDheader.viewpoint !== null )
				PCDheader.viewpoint = PCDheader.viewpoint[ 1 ];

			if ( PCDheader.points !== null )
				PCDheader.points = parseInt( PCDheader.points[ 1 ], 10 );

			if ( PCDheader.points === null )
				PCDheader.points = PCDheader.width * PCDheader.height;

			if ( PCDheader.size !== null ) {

				PCDheader.size = PCDheader.size[ 1 ].split( ' ' ).map( function ( x ) {

					return parseInt( x, 10 );
				} );
			}

			if ( PCDheader.count !== null ) {

				PCDheader.count = PCDheader.count[ 1 ].split( ' ' ).map( function ( x ) {
					return parseInt( x, 10 );
				} );

			} else {
				PCDheader.count = [];
				for ( var i = 0, l = PCDheader.fields.length; i < l; i ++ ) {
					PCDheader.count.push( 1 );
				}
			}

			PCDheader.offset = {};
			var sizeSum = 0;

			for ( var i = 0, l = PCDheader.fields.length; i < l; i ++ ) {
				if ( PCDheader.data === 'ascii' ) {
					PCDheader.offset[ PCDheader.fields[ i ] ] = i;
				} else {
					PCDheader.offset[ PCDheader.fields[ i ] ] = sizeSum;
					sizeSum += PCDheader.size[ i ];
				}
			}

			// for binary only
			PCDheader.rowSize = sizeSum;
			return PCDheader;
		}

		var textData = LoaderUtils.decodeText( new Uint8Array( data ) );

		// parse header (always ascii format)
		var PCDheader = parseHeader( textData );

		// parse data

		var position = [];
		var normal = [];
		var color = [];

		// ascii
		let n_points = 0;
		if ( PCDheader.data === 'ascii' ) {
			let cloud_points = []
			let z_min = 0;
			let z_max = 0;
			var offset = PCDheader.offset;
			var pcdData = textData.substr( PCDheader.headerLen );
			var lines = pcdData.split( '\n' );
			for ( var i = 0, l = lines.length; i < l; i ++ ) {
				if ( lines[ i ] === '' || i % DOWNSAMPLE != 0 ) continue;
				var line = lines[ i ].split( ' ' );
				if ( offset.x !== undefined ) {
					let px = parseFloat( line[offset.x] )
					let py = parseFloat( line[offset.y] )
					let pz = parseFloat( line[offset.z] )
					cloud_points.push(new Vector3(px, py, pz))
					if (pz < z_min) z_min = pz
					if (pz > z_max) z_max = pz
				}
				n_points += 1
			}

			var lut = new Lut( 'rainbow', 512);
			cloud_points.forEach((cp) => {
				// Determine color for each Vector3 and add to color array
				let r=1, g=1, b=1;
				if (COLOR_BY_HEIGHT) {
					let height = (cp.z - z_min) / (z_max - z_min)
					let c = lut.getColor(height);
					r = c.r
					g = c.g
					b = c.b
				}
				if (HIGHLIGHT_IN_BB && rois.length > 0) {
					let inside = false;
					for (let j=0; j<rois.length; j++) {
						if (rois[j].containsPoint(cp)) {
							inside = true;
							break
						}
					}
					if (inside) {
						r = IN_BB_R
						g = IN_BB_G
						b = IN_BB_B
					}
				}
				color.push(r, g, b)
				position.push(cp.x);
				position.push(cp.y);
				position.push(cp.z);
			})
		}

		// binary

		if ( PCDheader.data === 'binary_compressed' ) {
			console.error( 'THREE.PCDLoader: binary_compressed files are not supported' );
			return;
		}

		// build geometry

		var geometry = new BufferGeometry();

		if ( position.length > 0 ) geometry.addAttribute( 'position', new Float32BufferAttribute( position, 3 ) );
		if ( normal.length > 0 ) geometry.addAttribute( 'normal', new Float32BufferAttribute( normal, 3 ) );
		if ( color.length > 0 ) geometry.addAttribute( 'color', new Float32BufferAttribute( color, 3 ) );

		geometry.computeBoundingSphere();

		// build material

		var material = new PointsMaterial( { size: point_size } );

		if ( color.length > 0 ) {

			material.vertexColors = VertexColors;

		} else {

			material.color.setHex( 0xffffff );

		}

		// build mesh
		var mesh = new Points( geometry, material );
		mesh.name = 'cloud';
		console.log(`Loaded ${n_points} points from ${url}`)

		let roi_meshes = []
		if (SHOW_BB) {
			rois.forEach((roi) => {
				// Build bounding box mesh to show edges
				let helper = new Box3Helper(roi, 0xffff00);
				roi_meshes.push(helper)
			})
		}

		return {
			cloud_mesh: mesh,
			roi_meshes: roi_meshes
		}

	}

};

export { PCDLoaderWithROI };
