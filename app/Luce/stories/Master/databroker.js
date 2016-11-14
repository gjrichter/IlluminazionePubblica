
	// --------------------------------------------------------------
	// create number of listings field
	// --------------------------------------------------------------

	ixmaps.themeDataObj_Luce = function(data){

		var nListings = [];

		// get the column index of the column we need to create the new broker columns
		var indexSource = 0;
		for ( i in data[0] ){
			if ( data[0][i] == "LAMPADA" ){
				indexSource = i;
			}
		}

		// make new columns

		var newData = [];

		for ( var i=1; i<data.length; i++ ){

			var x = String(data[i][indexSource]);

			// the column is something like "SODIO AP 1500"

			// first split by " "
			var xA = x.split(" ");

			// get the last part
			var n = xA.pop();

			// 1. new column = int(last part) 
			data[i].push(parseInt(n));

			// 2. new column = resto (e.s."SODIO AP")
			data[i].push(xA.join(" "));
		}

		// make new column names

		data[0].push("CONSUMO");
		data[0].push("TIPO");

		return data;
	};

