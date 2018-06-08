#!/bin/bash

cd /Users/mimura/workspace/tenmon_html/autoreload
gulp > /dev/null &
pid=$!
echo "gulprunning output is discarding, process id is" $pid
