/**
 * Created by cfhernandez on 12/2/17.
 */

import chai from 'chai';
global.chai = chai;
global.chai.should();

global.expect = global.chai.expect;
import sinon from 'sinon';
global.sinon = sinon;

import sinonChai from 'sinon-chai';
global.sinonChai = sinonChai;
global.chai.use(global.sinonChai);