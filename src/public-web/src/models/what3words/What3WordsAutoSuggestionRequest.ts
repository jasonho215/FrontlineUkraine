/**
 * key  required  A valid API key; if not supplied as a parameter, a key must be supplied as a request header  key=[API-KEY]
 * input  required  The full or partial 3 word address to obtain suggestions for. At minimum this must be the first two complete words plus at least one character from the third word.  input=plan.clips.a
 * focus  optional  This is a location, specified as latitude,longitude (often where the user making the query is). If specified, the results will be weighted to give preference to those near the focus. For convenience, longitude is allowed to wrap around the 180 line, so 361 is equivalent to 1.  focus=51.521251,-0.203586
 * clip-to-country  optional  Restricts AutoSuggest to only return results inside the countries specified by comma-separated list of uppercase ISO 3166-1 alpha-2 country codes (for example, to restrict to Belgium and the UK, use clip-to-country=GB,BE). Clip-to-country will also accept lowercase country codes. Entries must be two a-z letters. WARNING: If the two-letter code does not correspond to a country, there is no error: API simply returns no results.  clip-to-country=NZ,AU
 * clip-to-bounding-box  optional  Restrict AutoSuggest results to a bounding box, specified by coordinates.south_lat,west_lng,north_lat,east_lng, where:south_lat less than or equal to north_latwest_lng less than or equal to east_lngIn other words, latitudes and longitudes should be specified order of increasing size. Lng is allowed to wrap, so that you can specify bounding boxes which cross the ante-meridian: -4,178.2,22,195.4  clip-to-bounding-box=51.521,-0.343,52.6,2.3324
 * clip-to-circle  optional  Restrict AutoSuggest results to a circle, specified by lat,lng,kilometres, where kilometres in the radius of the circle. For convenience, longitude is allowed to wrap around 180 degrees. For example 181 is equivalent to -179.  clip-to-circle=51.521,-0.343,142
 * clip-to-polygon  optional  Restrict AutoSuggest results to a polygon, specified by a comma-separated list of lat,lng pairs. The polygon should be closed, i.e. the first element should be repeated as the last element; also the list should contain at least 4 entries. The API is currently limited to accepting up to 25 pairs.  clip-to-polygon=51.521,-0.343,52.6,2.3324,54.234,8.343,51.521,-0.343
 * input-type  optional  For power users, used to specify voice input mode. Can be text (default),vocon-hybrid, nmdp-asr or generic-voice. see speech recognition.for more details.  input-type=text
 * language  optional  For normal text input, specifies a fallback language, which will help guide AutoSuggest if the input is particularly messy. If specified, this parameter must be a supported 3 word address language as an ISO 639-1 2 letter code. For voice input (see speech recognition), language must always be specified.  language=fr
 * prefer-land  optional  Makes AutoSuggest prefer results on land to those in the sea. This setting is on by default. Use false to disable this setting and receive more suggestions in the sea.
 */

export interface What3WordRequestParams {
  key?: string;
}

// TODO: Support more params
export interface What3WordsAutoSuggestionRequest extends What3WordRequestParams{
  input: string;
  clipToCountry?: string;
  language?: string;
}