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

var log = require("./log");

var SCOPE_GLOBAL = 0;
var SCOPE_VHOST = 1;
var SCOPE_LOCATION = 2;

var commands = {
  SCOPE_GLOBAL: {
    'error_log': function(ctx, path) {
      path.exists(function (exists) {
        if (!exists) {
          ctx.error('Please pre-create the error log');
        }
        else {
          ctx.add('error_log', path);
          ctx.done();
        }
      });
    }
  }
};

function CommandContext(parser, filename, line) {
  var self = this;
  self.parser = parser;
  self.filename = filename;
  self.line = line;
}

CommandContext.prototype.error = function(message) {
  process.nextTick(function() {
    this.parser.error(file, line, message);
  });
};

CommandContext.prototype.done = function() {
  process.nextTick(function() {
    this.parser.next();
  });
};

CommandContext.prototype.add = function() {
  var args = arguments;
  process.nextTick(function() {
    this.parser.add(args);
  });
};

function Parser() {
  var self = this;
  self.scope = SCOPE_GLOBAL;
  self.parsed = [];
}

/* buffer object input */
Parser.prototype.chunk = function(data) {
  /* TODO: improve */
  data.toString('utf-8', 0, data.length);
  
};

exports.Parser = function() {
  return new Parser();
};
