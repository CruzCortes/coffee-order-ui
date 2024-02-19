SHELL := /bin/bash
APPNAME := coffee-order-ui

REQS := sassc msgfmt
K := $(foreach r, ${REQS}, $(if $(shell command -v ${r} 2> /dev/null), '', $(error "${r} not installed")))

default: clean compile

clean:
	rm -Rf build/${APPNAME}*
	rm -f main.css 
compile:
	sassc -t compact -m public/css/main.scss main.css 
