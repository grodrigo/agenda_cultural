#!/bin/bash
#unused in cy tests, now we're using the api url
#localhost:27016/agendaCultural

echo "Reseting database..."
#mongo --host mongo --port 27017 agendaCultural
#mongo "${DATABASE_URL}" <<EOF
#mongo --host mongo --port 27017 agendaCultural <<EOF

[[ -z "$DATABASE_URL" ]] && DATABASE_URL="localhost:27016/agendaCulturalDB";
 [[ $b = 5 ]] && a="$c" || a="$d"

mongo "${DATABASE_URL}" <<EOF
	db.AccessToken.remove({});
	db.customUser.remove({});
	db.eventReview.remove({});
EOF
#mongo --host localhost --port 27016 agendaCultural <<EOF
	#db.evento.remove({});
#EOF


