BABEL := "node_modules/.bin/babel"


lib/:
	$(BABEL) ./src -d lib

test: lib/
	echo 'hello make'
