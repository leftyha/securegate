
var DISCONNECTED = false;
var PROCESS_EVENT_CB = null;

function logLine(s) {
    return;
    var logContainer = $('#log-container');
    var logContainerElement = logContainer[0];
    var isScrolledToBottom = logContainerElement.scrollHeight - logContainer.scrollTop() - logContainer.outerHeight() < 1;

    var new_text = logContainer.text() + s + '\n';
    new_text = new_text.substring(new_text.length - 100000);
    logContainer.text(new_text);

    if (isScrolledToBottom) {
        logContainer.scrollTop(logContainerElement.scrollHeight);
    }
}

function initSocket(processEventCallback) {
    PROCESS_EVENT_CB = processEventCallback;
    var ioSocket = io.connect('https://threatmap.bitdefender.com/');
    SOCKET = ioSocket;

    ioSocket.on('connecting', function () {
        logLine("Connecting...");
    });


    ioSocket.on('connect', function () {
        if (DISCONNECTED) {
            location.reload(true); // TODO: Remove
        }
        logLine("Connected");
        ioSocket.emit('subscribe', { event_name: 'botnet' });
        ioSocket.emit('subscribe', { event_name: 'portscan' });
        ioSocket.emit('subscribe', { event_name: 'telnet' });
        ioSocket.emit('subscribe', { event_name: 'ssh' });
        ioSocket.emit('subscribe', { event_name: 'rdp' });
        ioSocket.emit('subscribe', { event_name: 'vnc' });
        ioSocket.emit('subscribe', { event_name: 'mysql' });
        ioSocket.emit('subscribe', { event_name: 'mssql' });
        ioSocket.emit('subscribe', { event_name: 'http' });
        ioSocket.emit('subscribe', { event_name: 'iot' });
        ioSocket.emit('subscribe', { event_name: 'iot_botnet' });
        ioSocket.emit('subscribe', { event_name: 'infections' });
        ioSocket.emit('subscribe', { event_name: 'spam' });

    });

    ioSocket.on('connect_error', function (err) {
        console.log('connect_error', err);
    });

    ioSocket.on('error', function (err) {
        console.log('error', err);
    });

    ioSocket.on('disconnect', function (err) {
        console.log('disconnect');
        DISCONNECTED = true;
    });

    ioSocket.on('ev', function (data) {
        if (document.hidden) {
            CRT_TICK_DROPPED_EVENTS += data.length;
            return;
        }
        for (var i in data) {
            registerEvent(data[i]);
        }
    });

}

LAST_LOGGED_EVENT_TIME = 0;

function logEventThrottled(ts, event_name, geo) {
    var delay = 50;
    if (Date.now() < LAST_LOGGED_EVENT_TIME + delay) {
        return;
    }
    LAST_LOGGED_EVENT_TIME = Date.now();

    var ts_str = new Date(ts).toUTCString()
    try {
        logLine(ts_str + ' ' + event_name + ' ' + geo.c);
    } catch(err) { console.log("Error logging event: " + err); console.log(geo); }
}

PENDING_EVENT_COUNT = 0;
CRT_TICK_EVENT_COUNT = 0;
CRT_TICK_DROPPED_EVENTS = 0;

setInterval(function() {
   // console.log('Events shown in the last second: ' + CRT_TICK_EVENT_COUNT + '; Event queue length: ' + PENDING_EVENT_COUNT + '; Dropped events in the last second: ' + CRT_TICK_DROPPED_EVENTS);
    CRT_TICK_EVENT_COUNT = 0;
    CRT_TICK_DROPPED_EVENTS = 0;
}, 1000);

function registerEvent(evt) {
    if (PENDING_EVENT_COUNT >= 10000) {
        CRT_TICK_DROPPED_EVENTS += 1;
        return;
    }
    var delay = Math.round(5000 * Math.random());
    PENDING_EVENT_COUNT += 1;
    setTimeout(function() { PENDING_EVENT_COUNT -= 1; processEvent(evt); }, delay);
}

var EVENT_COLORS = {
    'portscan': 'yellow',
    'spam': 'orange'
}
function getEventColor(event_name) {
    if (event_name in EVENT_COLORS) {
        return EVENT_COLORS[event_name];
    }
    return 'red';
}

TEST = null;

function processEvent(evt) {
    if (!TEST)  TEST = evt;
    CRT_TICK_EVENT_COUNT += 1;

    if (PROCESS_EVENT_CB) {
        PROCESS_EVENT_CB(evt);
    }
    return;

    // if (Math.random() < 0.1) {
    //     console.log(Date.now() - evt.event_time);
    // }

    if (evt.t == 'attack') {
        drawAttack(evt.from, evt.to, getEventColor(evt.n));
        logEventThrottled(evt.ts, evt.n, evt.from);
    }
    if (evt.t == 'victim' || evt.t == 'attacker') {
        drawCircle(evt.loc, getEventColor(evt.n));
        logEventThrottled(evt.ts, evt.n, evt.loc);
    }
}
