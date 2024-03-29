import {SAVE_COMMENT} from 'actions/types';
import {saveComment} from "actions";

describe('saveComment', () => {
    it('has the correct type', () => {
        expect(saveComment().type).toEqual(SAVE_COMMENT);
    });

    it('has the correct payload', () => {
        const action = saveComment('New Comment');
        expect(action.payload).toEqual('New Comment');
    });
});