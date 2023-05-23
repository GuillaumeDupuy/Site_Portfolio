(function (global, undefined) {
    var Terminal =
        Terminal ||
        function (containerID, options) {
            if (!containerID) return;

            var defaults = {
                welcome: "",
                prompt:
                    '<span class="user">guest</span><span class="separator">@</span><span class="hostname">LAPTOP-70OOA4D1</span><span class="separator2">:</span>',
                separator: "<span class='separator3'>$</span>",
                theme: "dark-light",
                hostname: "LAPTOP-70OOA4D1",
            };

            var options = options || defaults;
            options.welcome = options.welcome || defaults.welcome;
            options.prompt = options.prompt || defaults.prompt;
            options.separator = options.separator || defaults.separator;
            options.theme = options.theme || defaults.theme;
            options.hostname = options.hostname || defaults.hostname;

            var extensions = Array.prototype.slice.call(arguments, 2);

            var _history = localStorage.history
                ? JSON.parse(localStorage.history)
                : [];
            var _histpos = _history.length;
            var _histtemp = "";

            // Create terminal and cache DOM nodes;
            var _terminal = document.getElementById(containerID);
            _terminal.classList.add("terminal");
            _terminal.classList.add("terminal-" + options.theme);
            _terminal.insertAdjacentHTML(
                "beforeEnd",
                [
                    '<div class="background"><div class="interlace"></div></div>',
                    '<div class="header">',
                    '<div class="logotext">',
                    "<br />████████╗███████╗██████╗ ███╗   &nbsp;&nbsp;███╗██╗███╗   &nbsp;&nbsp;██╗ █████╗ ██╗<br/>╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  &nbsp;██║██╔══██╗██║<br/>   &nbsp;&nbsp;&nbsp;██║   &nbsp;&nbsp;█████╗  &nbsp;██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║<br/>   &nbsp;&nbsp;&nbsp;██║   &nbsp;&nbsp;██╔══╝  &nbsp;██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║ <br/>   &nbsp;&nbsp;&nbsp;██║   &nbsp;&nbsp;███████╗██║  &nbsp;██║██║ ╚═╝ ██║██║██║ ╚████║██║  &nbsp;██║███████╗<br/>   &nbsp;&nbsp;&nbsp;╚═╝   &nbsp;&nbsp;╚══════╝╚═╝  &nbsp;╚═╝╚═╝     &nbsp;&nbsp;&nbsp;&nbsp;╚═╝╚═╝╚═╝  &nbsp;╚═══╝╚═╝  &nbsp;╚═╝╚══════╝",
                    "</div>",
                    "<br />",
                    ,
                    "Use command linux to navigate<br />",
                    "Use 'help' for available commands<br />",
                    "</div>",
                    '<div class="container">',
                    "<output></output>",
                    '<table class="input-line">',
                    '<tr><td nowrap><div class="prompt">' +
                    options.prompt +
                    "/" +
                    options.separator +
                    '</div></td><td width="100%"><input class="cmdline" autofocus /></td></tr>',
                    "</table>",
                    "</div>",
                ].join("")
            );
            var _container = _terminal.querySelector(".container");
            var _inputLine = _container.querySelector(".input-line");
            var _cmdLine = _container.querySelector(".input-line .cmdline");
            var _output = _container.querySelector("output");
            var _prompt = _container.querySelector(".prompt");
            var _background = document.querySelector(".background");

            var fileType = {
                FILE: "file",
                DIRECTORY: "directory",
                LINK: "link",
            };

            var _fs = {
                name: "/",
                type: fileType.DIRECTORY,
                content: [
                    {
                        name: "site",
                        type: fileType.DIRECTORY,
                        content: [
                            {
                                name: "Terminal-Web",
                                type: fileType.LINK,
                                content: "https://guillaumedupuy.github.io/Terminal-Web/terminal.html",
                            },
                        ],
                    },
                    {
                        name: "github",
                        type: fileType.DIRECTORY,
                        content: [
                            {
                                name: "repository",
                                type: fileType.LINK,
                                content: "https://github.com/GuillaumeDupuy/Terminal-Web",
                            },,
                        ],
                    },
                    {
                        name: "socials",
                        type: "directory",
                        content: [
                            {
                                name: "LinkedIn",
                                type: fileType.LINK,
                                content: "https://www.linkedin.com/in/guillaume-dupuy/",
                            },
                            {
                                name: "personnal_site",
                                type: fileType.DIRECTORY,
                                content: [
                                    {
                                        name: "Varius",
                                        type: fileType.LINK,
                                        content: "https://guillaumedupuy.fr/",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "README",
                        type: fileType.FILE,
                        content: `Hi,

                        		Welcome to my terminal website. This is a simulated terminal that lets you
                        		browse through different directories, files, and links.

                        		You can display available commands using 'help' command.

                        		Please feel free to report any issue.

                        		Have fun.
                        	`.replace(/\n/g, "<br />"),
                    },
                ],
            };

            var availableCommands = {
                clear: {
                    req_args: [],
                    opt_args: [],
                    description: "Clear console content",
                    usage: "clear",
                },
                ls: {
                    req_args: [],
                    opt_args: ["directory"],
                    description: "List files and directories",
                    usage: "ls /site",
                },
                ll: {
                    req_args: [],
                    opt_args: ["directory"],
                    description: "List files and directories",
                    usage: "ll ./socials",
                },
                cat: {
                    req_args: ["file"],
                    opt_args: [],
                    description: "Display files content",
                    usage: "cat README",
                },
                cd: {
                    req_args: [],
                    opt_args: ["directory"],
                    description: "Change directory",
                    usage: "cd /github",
                },
                open: {
                    req_args: ["link"],
                    opt_args: [],
                    description: "Open provided LINK",
                    usage: "open /site/Terminal-Web",
                },
                pwd: {
                    req_args: [],
                    opt_args: [],
                    description: "Display current directory path",
                    usage: "pwd",
                },
                "h, help, ?": {
                    req_args: [],
                    opt_args: [],
                    description: "Display detailed help",
                    usage: "help",
                },
                theme: {
                    req_args: [],
                    opt_args: ["dark-light|dark|white|kali|ubuntu|hacker|dracula|transparent|nyan-cat|powershell"],
                    description:
                        "Display current theme or set new theme if argument is provided",
                    usage: "theme white",
                },
                version: {
                    req_args: [],
                    opt_args: [],
                    description: "Display current version",
                    usage: "version",
                },
                about: {
                    req_args: [],
                    opt_args: [],
                    description: "About this terminal",
                    usage: "about",
                },
                sudo: {
                    req_args: ["directory/file/link"],
                    opt_args: ["command"],
                    description: "Execute command as root",
                    usage: "sudo cat README",
                },
                rm: {
                    req_args: ["directory/file/link"],
                    opt_args: [],
                    description: "Remove directory/file/link but it's not usable",
                    usage: "rm README",
                },
                rmdir: {
                    req_args: ["directory"],
                    opt_args: [],
                    description: "Remove directory but it's not usable",
                    usage: "rmdir /site",
                },
                mkdir: {
                    req_args: ["directory"],
                    opt_args: [],
                    description: "Create directory but it's not usable",
                    usage: "mkdir /site",
                },
                touch: {
                    req_args: ["file"],
                    opt_args: [],
                    description: "Create file but it's not usable",
                    usage: "touch README",
                },
                echo: {
                    req_args: ["text"],
                    opt_args: [],
                    description: "Display text",
                    usage: "echo Hello World",
                },
                date: {
                    req_args: [],
                    opt_args: [],
                    description: "Display current date",
                    usage: "date",
                },
                hostname: {
                    req_args: [],
                    opt_args: [],
                    description: "Display current hostname or set new hostname if argument is provided",
                    usage: "hostname or hostname new_hostname",
                },
                grep: {
                    req_args: ["file"],
                    opt_args: ["text"],
                    description: "Search for text in file",
                    usage: "grep fun README",
                },
                tail: {
                    req_args: ["file"],
                    opt_args: [],
                    description: "Display last according to the number of lines of the file",
                    usage: "tail README or tail README 2",
                },
                ping: {
                    req_args: ["host"],
                    opt_args: [],
                    description: "Ping host",
                    usage: "ping google.com",
                },
            };

            var _currentPwd = ["/"];

            // Hackery to resize the interlace background image as the container grows.
            _output.addEventListener(
                "DOMSubtreeModified",
                function (e) {
                    // Works best with the scroll into view wrapped in a setTimeout.
                    setTimeout(function () {
                        _cmdLine.scrollIntoView();
                    }, 0);
                },
                false
            );

            if (options.welcome) {
                output(options.welcome);
            }

            window.addEventListener(
                "click",
                function (e) {
                    _cmdLine.focus();
                },
                false
            );

            _output.addEventListener(
                "click",
                function (e) {
                    e.stopPropagation();
                },
                false
            );

            // Always force text cursor to end of input line.
            _cmdLine.addEventListener("click", inputTextClick, false);
            _inputLine.addEventListener(
                "click",
                function (e) {
                    _cmdLine.focus();
                },
                false
            );

            // Handle up/down key presses for shell history and enter for new command.
            _cmdLine.addEventListener("keyup", historyHandler, false);
            _cmdLine.addEventListener("keydown", processNewCommand, false);

            window.addEventListener(
                "keyup",
                function (e) {
                    _cmdLine.focus();
                    e.stopPropagation();
                    e.preventDefault();
                },
                false
            );

            function inputTextClick(e) {
                this.value = this.value;
            }

            function historyHandler(e) {
                console.log(e.keyCode);
                // Clear command-line on Escape key.
                if (e.keyCode == 27) {
                    this.value = "";
                    e.stopPropagation();
                    e.preventDefault();
                }
                var TABKEY = 9;
                if (e.keyCode == TABKEY) {
                    this.value += "    ";
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    return false;
                }

                if (_history.length && (e.keyCode == 38 || e.keyCode == 40)) {
                    if (_history[_histpos]) {
                        _history[_histpos] = this.value;
                    } else {
                        _histtemp = this.value;
                    }

                    if (e.keyCode == 38) {
                        // Up arrow key.
                        _histpos--;
                        if (_histpos < 0) {
                            _histpos = 0;
                        }
                    } else if (e.keyCode == 40) {
                        // Down arrow key.
                        _histpos++;
                        if (_histpos > _history.length) {
                            _histpos = _history.length;
                        }
                    }

                    this.value = _history[_histpos] ? _history[_histpos] : _histtemp;

                    // Move cursor to end of input.
                    this.value = this.value;
                }
            }

            function processNewCommand(e) {
                // Only handle the Enter key.
                if (e.keyCode != 13) return;

                var cmdline = this.value;

                // Save shell history.
                if (cmdline) {
                    _history[_history.length] = cmdline;
                    localStorage["history"] = JSON.stringify(_history);
                    _histpos = _history.length;
                }

                // Duplicate current input and append to output section.
                var line =
                    this.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
                line.removeAttribute("id");
                line.classList.add("line");
                var input = line.querySelector("input.cmdline");
                input.autofocus = false;
                input.readOnly = true;
                input.insertAdjacentHTML("beforebegin", input.value);
                input.parentNode.removeChild(input);
                _output.appendChild(line);

                // Hide command line until we're done processing input.
                _inputLine.classList.add("hidden");

                // Clear/setup line for next input.
                this.value = "";

                // Parse out command, args, and trim off whitespace.
                if (cmdline && cmdline.trim()) {
                    var args = cmdline.split(" ").filter(function (val, i) {
                        return val;
                    });
                    var cmd = args[0];
                    args = args.splice(1); // Remove cmd from arg list.
                }

                if (cmd) {
                    var response = false;
                    for (var index in extensions) {
                        var ext = extensions[index];
                        if (ext.execute) response = ext.execute(cmd, args);
                        if (response !== false) break;
                    }
                    if (response === false) response = cmd + ": command not found";
                    output(response);
                }

                // Show the command line.
                _prompt.innerHTML =
                    options.prompt +
                    "/" +
                    _currentPwd.slice(1).join("/") +
                    options.separator;
                _inputLine.classList.remove("hidden");
            }

            function parsePath(path, currentPwd) {
                path = path.replace(/[/]{2,}/, "/").replace(/[/]$/, "");
                var pwd = path.split("/");
                if (pwd[0] == "") pwd[0] = "/";
                else pwd = currentPwd.concat(pwd);

                for (var i = 0; i < pwd.length; i++) {
                    value = pwd[i];
                    if (value == "." || (value == ".." && i == 1)) {
                        pwd.splice(i, 1);
                        i--;
                    } else if (value == "..") {
                        pwd.splice(i - 1, 2);
                        i -= 2;
                    }
                }
                return pwd;
            }

            function outputListing(directory) {
                if (directory.type != fileType.DIRECTORY) return [directory.name];
                var output = [];
                directory.content.forEach(function (file) {
                    if (file.type == fileType.LINK) {
                        element =
                            '<a href="' +
                            file.content +
                            '" class="external">' +
                            file.name +
                            "</a>";
                    } else {
                        element =
                            '<span class="' + file.type + '">' + file.name + "</span>";
                    }
                    output.push(element);
                });
                return output;
            }

            function listDirectory(directory) {
                if (directory.type != fileType.DIRECTORY) return [directory.name];
                var output = [];
                directory.content.forEach(function (file) {
                    output.push(file.name);
                });
                return output;
            }

            function fileType(directory) {
                return directory.type;
            }

            function getFile(path) {
                var directory = _fs;
                var exists = true;
                var directoryListing, indexOfFile;

                for (var i = 1; i < path.length; i++) {
                    var element = path[i];
                    if (directory.type !== fileType.DIRECTORY)
                        return {
                            error: true,
                            result: directory.name + ": Not a directory",
                        };
                    directoryListing = listDirectory(directory);
                    indexOfFile = directoryListing.indexOf(element);
                    if (indexOfFile > -1) {
                        directory = directory["content"][indexOfFile];
                    } else {
                        return {
                            error: true,
                            result: element + ": Unknown file or directory",
                        };
                    }
                }
                return { error: false, result: directory };
            }

            function clear() {
                _output.innerHTML = "";
                _cmdLine.value = "";
                _background.style.minHeight = "";
            }

            function output(html) {
                _output.insertAdjacentHTML("beforeEnd", html);
                _cmdLine.scrollIntoView();
            }

            return {
                clear: clear,
                displayHelp: function () {
                    var result = '<table class="help">';
                    var cmdName, cmdContent;

                    result +=
                        '<tr><td><span style="text-decoration: underline;">Available commands</span></td><td><span style="text-decoration:underline;">Description</span></td></tr>';

                    Object.entries(availableCommands).forEach(function (content) {
                        cmdName = content[0];
                        cmdContent = content[1];
                        result += "<tr><td nowrap>";
                        result += "<b>" + cmdName + "</b>";
                        if (cmdContent["opt_args"].length > 0) {
                            result += " [<i>";
                            result += cmdContent["opt_args"].join("] [");
                            result += "</i>]";
                        }
                        if (cmdContent["req_args"].length > 0) {
                            result += " <i>";
                            result += cmdContent["req_args"].join(" ");
                            result += "</i>";
                        }
                        result += '</i></td><td width="100%">';
                        result += cmdContent["description"] + "<br />";
                        result += "Usage: " + cmdContent["usage"];
                        result += "</td></tr>";
                    });
                    result += "</table>";
                    return result;
                },
                setPrompt: function (prompt) {
                    _prompt.innerHTML = prompt + options.separator;
                },
                getPrompt: function () {
                    return _prompt.innerHTML.replace(
                        new RegExp(options.separator + "$"),
                        ""
                    );
                },
                setTheme: function (theme) {
                    _terminal.classList.remove("terminal-" + options.theme);
                    options.theme = theme;
                    _terminal.classList.add("terminal-" + options.theme);
                },
                getTheme: function () {
                    return options.theme;
                },
                listDirectory: function (directory) {
                    var path = parsePath(directory, _currentPwd);
                    var directory = getFile(path, _currentPwd);
                    if (directory.error) return directory.result;
                    return outputListing(directory.result).join("&nbsp;");
                },
                llistDirectory: function (directory) {
                    var path = parsePath(directory, _currentPwd);
                    var directory = getFile(path, _currentPwd);
                    if (directory.error) return directory.result;
                    return outputListing(directory.result).join("<br />");
                },
                changeDirectory: function (directory) {
                    var path = parsePath(directory, _currentPwd);
                    var directory = getFile(path, _currentPwd);
                    if (directory.error) return directory.result;
                    if (directory.result.type != fileType.DIRECTORY)
                        return directory.result.name + ": Not a directory";
                    _currentPwd = path;
                    return "";
                },
                currentDirectory: function () {
                    return "/" + _currentPwd.slice(1).join("/");
                },
                catFile: function (file) {
                    var path = parsePath(file, _currentPwd);
                    var directory = getFile(path, _currentPwd);
                    if (directory.error) return directory.result;
                    if (directory.result.type == fileType.DIRECTORY)
                        return directory.result.name + ": This is a directory";
                    return directory.result.content;
                },
                openFile: function (file) {
                    var path = parsePath(file, _currentPwd);
                    var directory = getFile(path, _currentPwd);
                    if (directory.error) return directory.result;
                    if (directory.result.type == fileType.DIRECTORY)
                        return directory.result.name + ": This is a directory";
                    window.open(directory.result.content, "_blank");
                    return "";
                },
                echoString: function (string) {
                    return string;
                },
                getDate: function () {
                    return new Date().toLocaleString();
                },
                setHostname: function (hostname) {
                    options.hostname = hostname;
                    return "";
                },
                getHostname: function () {
                    return options.hostname;
                },
                grepString: function (string, file) {
                    var path = parsePath(file, _currentPwd);
                    var directory = getFile(path, _currentPwd);
                    if (directory.error) return directory.result;
                    if (directory.result.type == fileType.DIRECTORY)
                        return directory.result.name + ": This is a directory";
                    var lines = directory.result.content.split("<br />");
                    var result = [];
                    for (var i = 0; i < lines.length; i++) {
                        if (lines[i].indexOf(string) > -1) {
                            result.push(lines[i]);
                        }
                    }
                    return result.join("\n");
                },
                tailFile: function (file, numberlines) {
                    var path = parsePath(file, _currentPwd);
                    var directory = getFile(path, _currentPwd);
                    if (directory.error) return directory.result;
                    if (directory.result.type == fileType.DIRECTORY)
                        return directory.result.name + ": This is a directory";
                    var lines = directory.result.content.split("<br />");
                    return lines.slice(-numberlines).join("\n");
                },
                pingHost: function (host) {
                    if (host != "google.com") return "Ping request could not find host google.com. Please check the name and try again.";
                    var ping = `Pinging ` + host + ` with 32 bytes of data: 
\n64 bytes from par10s49-in-f14.1e100.net ` + host + `: icmp_seq=1 ttl=114 time=7.61 ms 
64 bytes from par10s49-in-f14.1e100.net ` + host + `: icmp_seq=2 ttl=114 time=4.79 ms
64 bytes from par10s49-in-f14.1e100.net ` + host + `: icmp_seq=3 ttl=114 time=5.02 ms
\n--- ` + host + ` ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 5009ms`;
                    return ping.replace(/\n/g, "<br />");
                },
                code: function () {
                    
                }
            };
        };

    // node.js
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Terminal;

        // web browsers
    } else {
        var oldTerminal = global.Terminal;
        Terminal.noConflict = function () {
            global.Terminal = oldTerminal;
            return Terminal;
        };
        global.Terminal = Terminal;
    }
})(this);

// Get the canvas node and the drawing context
const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

// set the width and height of the canvas
const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = document.body.offsetHeight;

// draw a black rectangle of width and height same as that of the canvas
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);

const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

// Générer un caractère chinois aléatoire
function generateRandomChineseCharacter() {
    // Obtenir un point de code aléatoire dans la plage de caractères chinois
    const randomCodePoint = Math.floor(Math.random() * (40959 - 19968 + 1)) + 19968;
    // Convertir le point de code en un caractère chinois
    const randomCharacter = String.fromCharCode(randomCodePoint);
    return randomCharacter;
}

function generateRandomCharacter() {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      // generate a random character ASCII
      const randomAsciiCharacter = String.fromCharCode(Math.floor(Math.random() * 128));
      return randomAsciiCharacter;
    } else {
      // generate a random character chinese
      const randomChineseCharacter = generateRandomChineseCharacter();
      return randomChineseCharacter;
    }
}

function matrix () {
  // Draw a semitransparent black rectangle on top of previous drawing
  ctx.fillStyle = '#0001';
  ctx.fillRect(0, 0, w, h);

  // Set color to green and font to 15pt monospace in the drawing context
  ctx.fillStyle = '#0f0';
  ctx.font = '15pt monospace';

  // for each column put a random character at the end
  ypos.forEach((y, ind) => {
    // generate a random character
    const randomCharacter = generateRandomCharacter();

    // x coordinate of the column, y coordinate is already given
    const x = ind * 20;
    // render the character at (x, y)
    ctx.fillText(randomCharacter, x, y);

    // randomly reset the end of the column if it's at least 100px high
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    // otherwise just move the y coordinate for the column 20px down,
    else ypos[ind] = y + 20;
  });
}

// render the animation at 20 FPS.
setInterval(matrix, 50);