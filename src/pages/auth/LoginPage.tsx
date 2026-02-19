import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Shield, Building2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetLoginUser } from '@/store/slices/authSlice';
import { showMessage } from '@/utils/Constant';
import { setToLocalStorage } from '@/utils/localstorage';

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, error }: any = useSelector((state: any) => state.auth);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (status === 'complete') {
            navigate('/otp');
            dispatch(resetLoginUser());
        } else if (status === 'failed') {
            showMessage(error, 'error');
        }
    }, [status, navigate]);

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPhoneNumber(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (phoneNumber !== "9999999999") {
        showMessage("Use dummy number: 9999999999", "error");
        return;
    }

    await setToLocalStorage("user_mobile", phoneNumber);
    navigate("/otp");
};


    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!phoneNumber) {
    //         showMessage('Please enter your phone number.', 'error');
    //         return;
    //     }

    //     const phoneNumberPattern = /^[0-9]{10}$/;
    //     if (!phoneNumberPattern.test(phoneNumber)) {
    //         showMessage('Please enter a valid 10-digit phone number.', 'error');
    //         return;
    //     }

    //     await setToLocalStorage('user_mobile', phoneNumber);
    //     dispatch(loginUser({
    //         countryCode: '+91',
    //         phoneNumber: phoneNumber
    //     }));
    // };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Login Card */}
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                    <div className="text-center mb-8 pt-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-xl mb-4">
                            <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">R Core</h1>
                        <p className="text-gray-600">Real Estate Admin Dashboard</p>
                    </div>
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-semibold text-center text-gray-900">
                            Admin Login
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600">
                            Enter your phone number to access the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    Phone Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        maxLength={10}
                                        onChange={handlePhoneNumberChange}
                                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                        <span className="text-sm text-gray-500">+91</span>
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                                    <p className="text-sm text-red-600 flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        {error}
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium transition-colors"
                                disabled={status === 'loading' || !phoneNumber.trim()}
                            >
                                {status === 'loading' ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Sending OTP...
                                    </div>
                                ) : (
                                    'Send OTP'
                                )}
                            </Button>
                        </form>

                        {/* Security Notice */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800 mb-1">Secure Access</p>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        Your phone number is used for secure authentication. We'll send a verification code to confirm your identity.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                Protected by enterprise-grade security
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Version Info */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-400">
                        R Core Admin v1.0.0 • Real Estate Management System
                    </p>
                </div>
            </div>
        </div>
    );
};
