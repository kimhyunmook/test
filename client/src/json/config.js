import configJson from './site_config.json';

/** board 타겟 값 */
export function board_target() {
    let i, k
    let board = configJson.board;
    let header = configJson.header;
    const path = window.location.href.split('/');

    let targetName = header.map(el => {
        if (el.href.split('/')[2] == path[4]) {
            return el.name
        }
    })

    for (i = 0; i < targetName.length; i++) {
        if (targetName[i] !== undefined) {
            for (k = 0; k < board.target.length; k++) {
                if(targetName[i] == board.target[k].name) {
                    return board.target[k].type.division_type
                }
            }
        }
    }
}