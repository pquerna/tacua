/*
 * Licensed to Paul Querna under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * Paul Querna licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var fs = require("fs");

function pattern2path(pattern) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var path = [];
  for (var i = 0; i < pattern.length; i++) {
    if (pattern[i] == 'X') {
      path.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }
    else {
      path.push(pattern[i]);
    }
  }

  return path.join("");
}

exports.mkdtemp = function(pattern, callback) {
  var path = pattern2path(pattern);
  var mode = 0700;
  /* TODO: doesn't handle EEXIST... should put this in a loop cathcing this error. */
  fs.mkdir(path, mode, function() {
    callback(path);
  });
};
