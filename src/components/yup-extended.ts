import * as yup from 'yup';
import 'yup-phone';
import { AnyObject, Maybe } from 'yup/lib/types';

// add custom method to yup to validate phone numbers
yup.addMethod<yup.StringSchema>(
	yup.string,
	'validatePhone',
	function (message) {
		return this.test('test-phone', message, (value) => {
			if (value) return this.phone().isValidSync('+' + value);
			// if no phone number, return true
			return true;
		});
	}
);

declare module 'yup' {
	interface StringSchema<
		TType extends Maybe<string> = string | undefined,
		TContext extends AnyObject = AnyObject,
		TOut extends TType = TType
	> extends yup.BaseSchema<TType, TContext, TOut> {
		validatePhone(message: string): StringSchema<TType, TContext>;
	}
}

export default yup;
