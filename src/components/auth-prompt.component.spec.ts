import {
    describe,
    it,
    expect,
    injectAsync,
    TestComponentBuilder
} from 'angular2/testing';

import {AuthPromptComponent} from './auth-prompt.component';

export function main() {
    describe('AuthPromptComponent', () => {
        it('should be sane', () => {
            expect(1 + 1).toBe(2);
        });
    });
}