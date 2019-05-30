import Benchmark from 'benchmark';
import recurse from './recurse';
import tail from './tail';
import iter from './iter';

const suite = new Benchmark.Suite;

suite
  .add('recurse', () => { recurse(20) })
  .add('tail', () => { tail(20) })
  .add('iter', () => { iter(20) })
  .on('complete', function () {
    console.log('result: ')
    // console.log(this);
    this.forEach(function (result) {
      console.log(result.name, result.count, result.times.elapsed)
    })

    console.log('Fastest is ' + this.filter('fastest').map('name'));

    // assert.equal(
    //   this.filter('fastest').map('name'),
    //   'iter',
    //   'expect iter to be the fastest'
    // )
  })
  .run({ 'async': true });
