import { EtherUnits } from '../../src/converters';
import {
	InvalidConvertibleObjectError,
	InvalidConvertiblePropertiesListError,
	InvalidDesiredTypeError,
	InvalidIntegerError,
} from '../../src/errors';
import {
	Address,
	Bytes,
	HexString,
	Numbers,
	ValidTypes,
	ValueTypes,
	ValidReturnTypes,
} from '../../src/types';

export const bytesToHexValidData: [Bytes, HexString][] = [
	[new Uint8Array([72]), '0x48'],
	[new Uint8Array([72, 12]), '0x480c'],
	[Buffer.from('0c12', 'hex'), '0x0c12'],
	['0x9c12', '0x9c12'],
	['0X12c6', '0x12c6'],
];

export const bytesToHexInvalidData: [any, string][] = [
	[[9.5, 12.9], 'Invalid value given "9.5,12.9". Error: contains invalid integer values.'],
	[[-72, 12], 'Invalid value given "-72,12". Error: contains negative values.'],
	[[567, 10098], 'Invalid value given "567,10098". Error: contains numbers greater than 255.'],
	[
		[786, 12, 34, -2, 3],
		'Invalid value given "786,12,34,-2,3". Error: contains negative values.',
	],
	['0x0c1g', 'Invalid value given "0x0c1g". Error: not a valid hex string.'],
	['0c1g', 'Invalid value given "0c1g". Error: not a valid hex string.'],
	['data', 'Invalid value given "data". Error: not a valid hex string.'],
	[12, 'Invalid value given "12". Error: can not parse as byte data.'],
	[['string'], 'Invalid value given "string". Error: contains invalid integer values.'],
	[null, 'Invalid value given "null". Error: can not parse as byte data.'],
	[undefined, 'Invalid value given "undefined". Error: can not parse as byte data.'],
	[{}, 'Invalid value given "[object Object]". Error: can not parse as byte data.'],
];

export const hexToBytesValidData: [HexString, Buffer][] = [
	['0x48', Buffer.from([72])],
	['0x3772', Buffer.from('3772', 'hex')],
	['0x480c', Buffer.from([72, 12])],
	['0x0c12', Buffer.from('0c12', 'hex')],
	['0x9c12', Buffer.from('9c12', 'hex')],
	['0X12c6', Buffer.from('12c6', 'hex')],
];

export const hexToBytesInvalidData: [any, string][] = [
	[[9.5, 12.9], 'Invalid value given "9.5,12.9". Error: contains invalid integer values.'],
	[[-72, 12], 'Invalid value given "-72,12". Error: contains negative values.'],
	[[567, 10098], 'Invalid value given "567,10098". Error: contains numbers greater than 255.'],
	[
		[786, 12, 34, -2, 3],
		'Invalid value given "786,12,34,-2,3". Error: contains negative values.',
	],
	['0x0c1g', 'Invalid value given "0x0c1g". Error: not a valid hex string.'],
	['0c1g', 'Invalid value given "0c1g". Error: not a valid hex string.'],
	['data', 'Invalid value given "data". Error: not a valid hex string.'],
	[12, 'Invalid value given "12". Error: can not parse as byte data.'],
	[['string'], 'Invalid value given "string". Error: contains invalid integer values.'],
	[null, 'Invalid value given "null". Error: can not parse as byte data.'],
	[undefined, 'Invalid value given "undefined". Error: can not parse as byte data.'],
	[{}, 'Invalid value given "[object Object]". Error: can not parse as byte data.'],
];

export const numberToHexValidData: [Numbers, HexString][] = [
	[1, '0x1'],
	[255, '0xff'],
	[256, '0x100'],
	[54, '0x36'],
	[BigInt(12), '0xc'],
	[12n, '0xc'],
	['768', '0x300'],
	['-768', '-0x300'],
	[-255, '-0xff'],
	['0xFF0', '0xff0'],
	['-0xa0', '-0xa0'],
	[0xff, '0xff'],
	[-0xff, '-0xff'],
];

export const numberToHexInvalidData: [any, string][] = [
	[12.2, 'Invalid value given "12.2". Error: not a valid integer.'],
	['0xag', 'Invalid value given "0xag". Error: not a valid integer.'],
	['122g', 'Invalid value given "122g". Error: not a valid integer.'],
	[null, 'Invalid value given "null". Error: not a valid integer.'],
	[undefined, 'Invalid value given "undefined". Error: not a valid integer.'],
	[{}, 'Invalid value given "[object Object]". Error: not a valid integer.'],
];

export const hexToNumberValidData: [HexString, Numbers][] = [
	['0x1', 1],
	['0xff', 255],
	['0x100', 256],
	['0x36', 54],
	['0xc', 12],
	['0x300', 768],
	['-0x300', -768],
	['-0xff', -255],
	['0XFF0', 4080],
	['-0xa0', -160],
	['0x1fffffffffffff', 9007199254740991], // Number.MAX_SAFE_INTEGER
	['0x20000000000000', BigInt('9007199254740992')], // Number.MAX_SAFE_INTEGER + 1
	['-0x1fffffffffffff', -9007199254740991], // Number.MIN_SAFE_INTEGER
	['-0x20000000000000', BigInt('-9007199254740992')], // Number.MIN_SAFE_INTEGER - 1
];

export const hexToNumberInvalidData: [HexString, string][] = [
	['1a', 'Invalid value given "1a". Error: not a valid hex string.'],
	['0xffdg', 'Invalid value given "0xffdg". Error: not a valid hex string.'],
	['xfff', 'Invalid value given "xfff". Error: not a valid hex string.'],
	['-123', 'Invalid value given "-123". Error: not a valid hex string.'],
	['-9x123', 'Invalid value given "-9x123". Error: not a valid hex string.'],
];

export const utf8ToHexValidData: [string, HexString][] = [
	['I have 100£', '0x49206861766520313030c2a3'],
	['I \u1234data', '0x4920e188b464617461'],
	['I ♥ data', '0x4920e299a52064617461'],
	['I \u0000 data', '0x4920002064617461'],
	['\u0000 null suffix', '0x206e756c6c20737566666978'],
	['null prefix\u0000', '0x6e756c6c20707265666978'],
	['\u0000', '0x'],
];

export const utf8ToHexInvalidData: [any, string][] = [
	[12, 'Invalid value given "12". Error: not a valid string.'],
	[BigInt(12), 'Invalid value given "12". Error: not a valid string.'],
	[12n, 'Invalid value given "12". Error: not a valid string.'],
	[null, 'Invalid value given "null". Error: not a valid string.'],
	[undefined, 'Invalid value given "undefined". Error: not a valid string.'],
	[{}, 'Invalid value given "[object Object]". Error: not a valid string.'],
	[true, 'Invalid value given "true". Error: not a valid string.'],
	[false, 'Invalid value given "false". Error: not a valid string.'],
];

export const hexToUtf8ValidData: [HexString, string][] = [
	['0x49206861766520313030c2a3', 'I have 100£'],
	['0x4920e188b464617461', 'I \u1234data'],
	['0x4920e299a52064617461', 'I ♥ data'],
	['0x4920002064617461', 'I \u0000 data'],
	['0x206e756c6c20737566666978', ' null suffix'],
	['0x6e756c6c20707265666978', 'null prefix'],
	['0x', ''],
];

export const hexToUtf8InvalidData: [any, string][] = [
	[
		'0x4920686176652031303g0c2a3',
		'Invalid value given "0x4920686176652031303g0c2a3". Error: not a valid hex string.',
	],
	['afde', 'Invalid value given "afde". Error: not a valid hex string.'],
	[null, 'Invalid value given "null". Error: can not parse as byte data.'],
	[undefined, 'Invalid value given "undefined". Error: can not parse as byte data.'],
	[{}, 'Invalid value given "[object Object]". Error: can not parse as byte data.'],
	[true, 'Invalid value given "true". Error: can not parse as byte data.'],
];

export const asciiToHexValidData: [string, HexString][] = [
	['I have 100', '0x49206861766520313030'],
	['I \u1234data', '0x49203464617461'],
	['I data', '0x492064617461'],
	['I \u0000 data', '0x4920002064617461'],
	['\u0000 null suffix', '0x00206e756c6c20737566666978'],
	['null prefix\u0000', '0x6e756c6c2070726566697800'],
	['\u0000', '0x00'],
	['', '0x'],
];

export const hexToAsciiValidData: [string, HexString][] = [
	['0x49206861766520313030', 'I have 100'],
	['0x49203464617461', 'I 4data'],
	['0x492064617461', 'I data'],
	['0x4920002064617461', 'I \u0000 data'],
	['0x00206e756c6c20737566666978', '\u0000 null suffix'],
	['0x6e756c6c2070726566697800', 'null prefix\u0000'],
	['0x00', '\u0000'],
	['0x', ''],
];

export const toHexValidData: [Numbers | Bytes | Address | boolean, [HexString, ValueTypes]][] = [
	[1, ['0x1', 'uint256']],
	[255, ['0xff', 'uint256']],
	[256, ['0x100', 'uint256']],
	[BigInt(12), ['0xc', 'bigint']],
	[12n, ['0xc', 'bigint']],
	['768', ['0x373638', 'string']],
	['-768', ['0x2d373638', 'string']],
	[-255, ['-0xff', 'int256']],
	['I have 100£', ['0x49206861766520313030c2a3', 'string']],
	['I \u0000 data', ['0x4920002064617461', 'string']],
	['\u0000 null suffix', ['0x206e756c6c20737566666978', 'string']],
	['null prefix\u0000', ['0x6e756c6c20707265666978', 'string']],
	['\u0000', ['0x', 'string']],
	[true, ['0x01', 'bool']],
	[false, ['0x00', 'bool']],
	['0x123c', ['0x123c', 'bytes']],
];

const conversionBaseData: [[Numbers, EtherUnits], string][] = [
	[[0, 'wei'], '0'],
	[[123, 'wei'], '123'],
	[['123', 'wei'], '123'],
	[[BigInt(123), 'wei'], '123'],
	[[123n, 'wei'], '123'],
	[['1000', 'wei'], '1000'],
	[['1', 'kwei'], '0.001'],
	[['1', 'mwei'], '0.000001'],
	[['1', 'gwei'], '0.000000001'],
	[['1', 'micro'], '0.000000000001'],
	[['1', 'milli'], '0.000000000000001'],
	[['1', 'ether'], '0.000000000000000001'],
	[['1', 'kether'], '0.000000000000000000001'],
	[['1', 'mether'], '0.000000000000000000000001'],
	[['1', 'gether'], '0.000000000000000000000000001'],
	[['1', 'tether'], '0.000000000000000000000000000001'],
	[['900000000000000000000000000001', 'tether'], '0.900000000000000000000000000001'],
	[['1000', 'kwei'], '1'],
	[['1000000', 'mwei'], '1'],
	[['1000000000', 'gwei'], '1'],
	[['1000000000000', 'micro'], '1'],
	[['1000000000000000', 'milli'], '1'],
	[['1000000000000000000', 'ether'], '1'],
	[['1000000000000000000000', 'kether'], '1'],
	[['1000000000000000000000000', 'mether'], '1'],
	[['1000000000000000000000000000', 'gether'], '1'],
	[['1000000000000000000000000000000', 'tether'], '1'],
	[['1000000000000000000000000000000', 'tether'], '1'],
	[['12345678', 'gwei'], '0.012345678'],
	[['76912345678', 'gwei'], '76.912345678'],
	[['134439381738', 'gwei'], '134.439381738'],
	[['178373938391829348', 'ether'], '0.178373938391829348'],
	[['879123456788877661', 'gwei'], '879123456.788877661'],
	[['879123456788877661', 'tether'], '0.000000000000879123456788877661'],
];

export const fromWeiValidData: [[Numbers, EtherUnits], string][] = [
	...conversionBaseData,
	[['0xff', 'wei'], '255'],
];

export const toWeiValidData: [[Numbers, EtherUnits], string][] = [
	...conversionBaseData,
	[['255', 'wei'], '0xFF'],
];

export const fromWeiInvalidData: [[any, any], string][] = [
	[['123.34', 'kwei'], 'Invalid value given "123.34". Error: not a valid integer.'],
	[[null, 'kwei'], 'Invalid value given "null". Error: not a valid integer.'],
	[[undefined, 'kwei'], 'Invalid value given "undefined". Error: not a valid integer.'],
	[[{}, 'kwei'], 'Invalid value given "[object Object]". Error: not a valid integer.'],
	[['data', 'kwei'], 'Invalid value given "data". Error: not a valid integer.'],
	[['1234', 'uwei'], 'Invalid value given "uwei". Error: invalid unit.'],
];

export const toWeiInvalidData: [[any, any], string][] = [
	[[null, 'kwei'], 'Invalid value given "null". Error: not a valid number.'],
	[[undefined, 'kwei'], 'Invalid value given "undefined". Error: not a valid number.'],
	[[{}, 'kwei'], 'Invalid value given "[object Object]". Error: not a valid number.'],
	[['data', 'kwei'], 'Invalid value given "data". Error: not a valid number.'],
	[['1234', 'uwei'], 'Invalid value given "uwei". Error: invalid unit.'],
];
export const toCheckSumValidData: [string, string][] = [
	['0x0089d53f703f7e0843953d48133f74ce247184c2', '0x0089d53F703f7E0843953D48133f74cE247184c2'],
	['0x5fbc2b6c19ee3dd5f9af96ff337ddc89e30ceaef', '0x5FBc2b6C19EE3DD5f9Af96ff337DDC89e30ceAef'],
	['0xa54D3c09E34aC96807c1CC397404bF2B98DC4eFb', '0xa54d3c09E34aC96807c1CC397404bF2B98DC4eFb'],
];

export const convertToValidTypeValidData: [
	ValidReturnTypes[ValidTypes],
	ValidTypes,
	ValidReturnTypes[ValidTypes],
][] = [
	['0x2a', ValidTypes.HexString, '0x2a'],
	['42', ValidTypes.HexString, '0x2a'],
	[42, ValidTypes.HexString, '0x2a'],
	[BigInt('42'), ValidTypes.HexString, '0x2a'],
	['0x2a', ValidTypes.NumberString, '42'],
	['42', ValidTypes.NumberString, '42'],
	[42, ValidTypes.NumberString, '42'],
	[BigInt('42'), ValidTypes.NumberString, '42'],
	['0x2a', ValidTypes.Number, 42],
	['42', ValidTypes.Number, 42],
	[42, ValidTypes.Number, 42],
	[BigInt('42'), ValidTypes.Number, 42],
	['0x2a', ValidTypes.BigInt, BigInt('42')],
	['42', ValidTypes.BigInt, BigInt('42')],
	[42, ValidTypes.BigInt, BigInt('42')],
	[BigInt('42'), ValidTypes.BigInt, BigInt('42')],
	['-0x2a', ValidTypes.HexString, '-0x2a'],
	['-42', ValidTypes.HexString, '-0x2a'],
	[-42, ValidTypes.HexString, '-0x2a'],
	[BigInt('-42'), ValidTypes.HexString, '-0x2a'],
	['-0x2a', ValidTypes.NumberString, '-42'],
	['-42', ValidTypes.NumberString, '-42'],
	[-42, ValidTypes.NumberString, '-42'],
	[BigInt('-42'), ValidTypes.NumberString, '-42'],
	['-0x2a', ValidTypes.Number, -42],
	['-42', ValidTypes.Number, -42],
	[-42, ValidTypes.Number, -42],
	[BigInt('-42'), ValidTypes.Number, -42],
	['-0x2a', ValidTypes.BigInt, BigInt('-42')],
	['-42', ValidTypes.BigInt, BigInt('-42')],
	[-42, ValidTypes.BigInt, BigInt('-42')],
	[BigInt('-42'), ValidTypes.BigInt, BigInt('-42')],
];

export const convertToValidTypeInvalidData: [
	any,
	any,
	InvalidDesiredTypeError | InvalidIntegerError,
][] = [
	['0x2a', 'hexString', new InvalidDesiredTypeError('hexString')],
	['0x2a', 'qwerty', new InvalidDesiredTypeError('qwerty')],
	['0x2a', 42, new InvalidDesiredTypeError(42)],
	['0x2a', null, new InvalidDesiredTypeError(null)],
	['0x2a', undefined, new InvalidDesiredTypeError(undefined)],
	['0x2a', BigInt(0), new InvalidDesiredTypeError(BigInt(0))],
	['foo', ValidTypes.HexString, new InvalidIntegerError('foo')],
	['4.2', ValidTypes.HexString, new InvalidIntegerError('4.2')],
	[null, ValidTypes.HexString, new InvalidIntegerError(null)],
	[undefined, ValidTypes.HexString, new InvalidIntegerError(undefined)],
	[true, ValidTypes.HexString, new InvalidIntegerError(true)],
];

export const convertObjectPropertiesToValidTypeValidData: [
	Record<any, any>, // Starting object
	string[], // List of keys to convert
	ValidTypes, // Type to convert to
	Record<any, any>, // Expected result
][] = [
	[
		{
			one: '42',
			two: 42,
			three: '0x2a',
			four: BigInt(42),
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
		['one', 'two', 'three', 'four'],
		ValidTypes.HexString,
		{
			one: '0x2a',
			two: '0x2a',
			three: '0x2a',
			four: '0x2a',
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
	],
	[
		{
			one: '42',
			two: 42,
			three: '0x2a',
			four: BigInt(42),
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
		['one', 'two', 'three', 'four'],
		ValidTypes.NumberString,
		{
			one: '42',
			two: '42',
			three: '42',
			four: '42',
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
	],
	[
		{
			one: '42',
			two: 42,
			three: '0x2a',
			four: BigInt(42),
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
		['one', 'two', 'three', 'four'],
		ValidTypes.Number,
		{
			one: 42,
			two: 42,
			three: 42,
			four: 42,
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
	],
	[
		{
			one: '42',
			two: 42,
			three: '0x2a',
			four: BigInt(42),
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
		['one', 'two', 'three', 'four'],
		ValidTypes.BigInt,
		{
			one: BigInt(42),
			two: BigInt(42),
			three: BigInt(42),
			four: BigInt(42),
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
	],
	[
		{
			one: '42',
			two: 42,
			three: '0x2a',
			four: BigInt(42),
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
		['one', 'two', 'three', 'four', 'eight'], // Testing undefined key 'eight'
		ValidTypes.BigInt,
		{
			one: BigInt(42),
			two: BigInt(42),
			three: BigInt(42),
			four: BigInt(42),
			five: false,
			six: { one: '42', two: 42, three: '0x2a' },
		},
	],
	[{}, ['one', 'two', 'three', 'four', 'eight'], ValidTypes.BigInt, {}],
];

export const convertObjectPropertiesToValidTypeInvalidData: [
	any, // Starting object
	any, // List of keys to convert
	any, // Type to convert to
	InvalidDesiredTypeError | InvalidIntegerError, // Expected error
][] = [
	[
		{
			one: 42,
			two: false,
			three: '0x2a',
		},
		['one', 'two', 'three'],
		ValidTypes.HexString,
		new InvalidIntegerError(false),
	],
	[
		{
			one: 42,
			two: '42',
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			three: () => {},
		},
		['one', 'two', 'three', 'four'],
		ValidTypes.HexString,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		new InvalidIntegerError(() => {}),
	],
	[
		undefined,
		['one', 'two', 'three', 'four'],
		ValidTypes.HexString,
		new InvalidConvertibleObjectError(undefined),
	],
	[
		42,
		['one', 'two', 'three', 'four'],
		ValidTypes.HexString,
		new InvalidConvertibleObjectError(42),
	],
	[
		null,
		['one', 'two', 'three', 'four'],
		ValidTypes.HexString,
		new InvalidConvertibleObjectError(null),
	],
	[
		{
			one: 42,
			two: '42',
		},
		undefined,
		ValidTypes.HexString,
		new InvalidConvertiblePropertiesListError(undefined),
	],
	[
		{
			one: 42,
			two: '42',
		},
		42,
		ValidTypes.HexString,
		new InvalidConvertiblePropertiesListError(42),
	],
	[
		{
			one: 42,
			two: '42',
		},
		['one', 'two', 'three', 42],
		ValidTypes.HexString,
		new InvalidConvertiblePropertiesListError(['one', 'two', 'three', 42]),
	],
	[
		{
			one: 42,
			two: '42',
		},
		['one', 'two', 'three', 'four'],
		undefined,
		new InvalidDesiredTypeError(undefined),
	],
	[
		{
			one: 42,
			two: '42',
		},
		['one', 'two', 'three', 'four'],
		42,
		new InvalidDesiredTypeError(42),
	],
	[
		{
			one: 42,
			two: '42',
		},
		['one', 'two', 'three', 'four'],
		'hexString',
		new InvalidDesiredTypeError('hexString'),
	],
];