features to add:
-searchable documents by city, day of week, time of day, meeting type (array), proximity to user's current loc
-use google map api to get lat/long of an address.  having problems doing this in bulk
-append pushpins on map for each location
-for map pushpins, add tooltip that displays on hover
-defaults to english.  can switch to another language (spanish, portuguese?)
-search filter displays results in either map or tabular format.  table may include results not in map b/c some meetings may be missing full addresses
-create indices in mongo to improve performance.
-use google geocoding to append each document w/ zip, lat/long
-add indexing on location to allow for sort by proximity
-improve styling, design.
make responsive and suitable for mobile devices, probably using bootstrap
-collect data from more cities, states
add state dropdown
improve intiial load time.  figure out workflow:  should it default to user's location and display all nearby meetings?
