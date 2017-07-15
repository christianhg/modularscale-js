var ratios = {
  minorSecond: 16/15,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 4/3,
  augFourth: 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.61803398875,
  majorSixth: 5/3,
  minorSeventh: 16/9,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 8/3,
  majorTwelfth: 3,
  doubleOctave: 4
};

// Function settings
var modularscale = {
  base: 16,
  ratio: 1.5,
};

// Function
function msFunction(v,settings) {

  // Parse settings
  // Write initial settings if undefined
  if (settings === undefined) {
    settings = modularscale;
  }
  // Initiate values
  var base = settings.base;
  var ratio = settings.ratio;
  // Fill in the blanks with default values
  if (ratio === undefined) {
    ratio = modularscale.ratio;
  }
  if (base === undefined) {
    base = modularscale.base;
  }

  // Fast calc if not multi stranded
  if (!Array.isArray(base) || base.length === 1) {
    return (Math.pow(ratio,v) * base);
  }

  // Normalize bases
  // Find the upper bounds for base values
  var baseHigh = Math.pow(ratio,1) * base[0];
  for (var i = 1; i < base.length; i++) {
    // shift up if value too low
    while (base[i]/1 < base[0]/1) {
      base[i] = Math.pow(ratio,1) * base[i];
    }
    // Shift down if too high
    while (base[i]/1 >= baseHigh/1) {
      base[i] = Math.pow(ratio,-1) * base[i];
    }
  }
  // Sort bases
  base.sort();

  // Figure out what base to use with modulo
  var rBase = Math.round((v / base.length - Math.floor(v/base.length)) * base.length);

  // Return
  return Math.pow(ratio,Math.floor(v/base.length)) * base[rBase];
};

function ms(v,settings) {
  return msFunction(v,settings);
}

module.exports = { ms, ratios };
