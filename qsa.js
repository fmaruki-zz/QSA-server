var html = document.children[0].innerHTML;
function parse(html) {
    var tag, char;
    var pos = 0;
    var tags = [];

    function getNextTag() {
        var tag = {};
        while ((char=html[pos]) != '<') {
            // skip until the start of the next tag
            if(char === undefined) {
                // end of the file
                return undefined
            };
            pos++;
        }
        tag.init = pos;

        pos++;

        var isClose = false;
        if(html[pos] == '/') {
            // it's a close tag
            isClose = true;
            pos++;
        }

        // get name of the tag
        var namePos = pos;
        while((char=html[pos]) != ' ') {
            if(char == '>') {
                break;
            }
            pos++;
        }
        tag.name = html.slice(namePos, pos);
        tag.isClose = isClose;

        while((char=html[pos]) != '>') {
            // skip until end of tag
            if(char == '"') {
                // skip inside double quotes
                pos++;
                while(html[pos] != '"') {
                    pos++;
                }
            } else if(char == "'") {
                // skip inside single quotes
                pos++;
                while(html[pos] != "'") {
                    pos++;
                }
            }
            pos++;
        }

        tag.end = ++pos;
        return tag;
    }

    var i = 0;
    while(tag=getNextTag()) {
        if(tag.isClose) {
            //find open-tag that matches this close-tag
            var k=i;
            var name = tag.name;
            while(k--) {
                if(tags[k].name == name && tags[k].isClose == false) {
                    tag.open = k;
                    tags[k].close = i;
                    break;
                }
                if(tags[k].open) {
                    k = tags[k].open;
                }
            }
        }
        tags.push(tag);
        i++;
    }
    return tags;
}