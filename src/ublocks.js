/*

    ublocks.js

    connectivity with the MicroBlocks IDE

    written by Bernat Romagosa
    bernat@romagosa.work

    Copyright (C) 2019 by Bernat Romagosa

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    prerequisites:
    --------------
    needs 
*/

modules.ublocks = '2019-May-2';

// Global stuff

var MicroBlocksClient;

// MicroBlocksClient

function MicroBlocksClient() {
    this.init();
}

MicroBlocksClient.prototype.init = function () {
    this.url = 'http://localhost:6473/';
    this.pendingBroadcasts = [];
};

MicroBlocksClient.prototype.fetchBroadcasts = function () {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', this.url + 'getBroadcasts', true);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            myself.pendingBroadcasts = httpRequest.responseText.split('\n');
        }
    };
    httpRequest.send();
};

MicroBlocksClient.prototype.broadcast = function (message) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open(
        'GET',
        this.url + 'broadcast/' + encodeURIComponent(message),
        true);
    httpRequest.send();
};
