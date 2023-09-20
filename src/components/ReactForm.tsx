'use client'
import Link from 'next/link';
import google from '@/assets/images/google.256x256.png'
import apple from '@/assets/images/apple.png'
import vn from '@/assets/images/vn.png'
import en from '@/assets/images/bg.png'
import jp from '@/assets/images/jp.png'
import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { useForm, SubmitHandler, set } from "react-hook-form";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, InputAdornment, ListItemIcon, ListItemText, Menu, OutlinedInput } from '@mui/material';
import { WellCome, WellComeUK, WellComeVN, WellcomeJapan } from '@/data/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Inputs = {
    email: string,
    password: string,
};

const flags = {
    VN: { src: vn, alt: "vn picture" },
    UK: { src: en, alt: "uk picture" },
    Japan: { src: jp, alt: "jp picture" },
};
let data: WellCome
export default function ReactForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    const handleFormSubmit = async (data: Inputs) => {
        try {
            await onSubmit(data);
            setIsError(false);
        } catch (error) {
            setIsError(true);
        }
    };

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Việt Nam"); // state to store the selected item
    const [flagUrl, setFlagUrl] = useState(flags.VN.src);
    const [flagAlt, setAltUrl] = useState(flags.VN.alt);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // state to store the anchor element
    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelect = (value: string) => {
        setSelected(value); // update the selected item
        handleClose();

    };

    const handlerChange = (url: StaticImageData, alt: string) => {
        setFlagUrl(url);
        setAltUrl(alt);

    }

    const [showPassword, setShowPassword] = React.useState(false);
    const [isError, setIsError] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    if (selected === "Việt Nam") {
        data = WellComeVN
    } else if (selected === "United Kingdom") {
        data = WellComeUK
    } else if (selected === "Japan") {
        data = WellcomeJapan
    }

    return (
        <div className="relative space-y-10 flex flex-col">

            <button
                onClick={handleOpen}
                className='top-5 right-8 absolute flex'
            >
                <Image
                    src={flagUrl}
                    alt={flagAlt}
                    width={30}
                    height={30}
                    className=" mr-2 "
                />
                <span className='mt-2 '>{selected}</span>
                <KeyboardArrowDownIcon className='mt-2 ml-1' />
            </button>

            <Menu
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >

                <MenuList
                    sx={{ backgroundColor: "#F0F0F0" }}>

                    <MenuItem
                        onClick={() => {
                            handleSelect("Việt Nam");
                            handlerChange(flags.VN.src, flags.VN.alt)
                        }}
                        selected={selected === "Việt Nam"}
                    >
                        <Image
                            src={vn}
                            alt='vn picture'
                            width={30}
                            height={30}
                        >
                        </Image>
                        <ListItemText
                            className='ml-2'
                        >
                            Việt Nam</ListItemText>
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            handleSelect("United Kingdom");
                            handlerChange(flags.UK.src, flags.UK.alt)
                        }}
                        selected={selected === "United Kingdom" && flagUrl === flags.UK.src} >
                        <Image
                            src={en}
                            alt='vn picture'
                            width={30}
                            height={30}
                        >
                        </Image>
                        <ListItemText
                            className='ml-2'
                        >
                            United Kingdom
                        </ListItemText>
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            handleSelect("Japan");
                            handlerChange(flags.Japan.src, flags.Japan.alt)
                        }}
                        selected={selected === "Japan"}>
                        <Image
                            src={jp}
                            alt='vn picture'
                            width={30}
                            height={30}
                        >
                        </Image>
                        <ListItemText
                            className='ml-2'
                        >
                            Japan
                        </ListItemText>
                    </MenuItem>

                </MenuList>

            </Menu>

            <h1 className='pt-16 text-3xl text-center '>{data.message}</h1>

            <form
                // handleSignIn
                onSubmit={handleSubmit(handleFormSubmit)}
                className='ml-16 mr-16 justify-content: center mx-auto space-y-10 flex flex-col'
            >
                <TextField

                    className=' w-96 bg-custom-blue'
                    id="email"
                    label={data.email}
                    {...register("email",
                        {
                            required: true,
                        })
                    }
                />

                <FormControl
                    sx={{ width: '24rem', backgroundColor: '#e8f0fe' }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">{data.password}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Mật khẩu"
                        {...register("password",
                            { required: true })}

                    />
                </FormControl>



                <Link href={'/forgot-password'} className='absolute right-16 top-96'>{data.forgotPassword}</Link>

                <button
                    type="submit"
                    className='w-full h-12 bg-custom-blue1 text-xl text-white rounded-md'
                >
                    {data.input}
                </button>
                {
                    (errors.password || errors.email) && (
                        toast.error(
                            data.emptyErr,
                            { autoClose: 2000, position: "top-right" },
                        )
                    )
                }
                <ToastContainer />
            </form>

            <span className="pt-16 flex items-center">
                <hr className="flex-1 border-gray-300" />
                <span className="ml-4 mr-4">{data.or}</span>
                <hr className="flex-1 border-gray-300" />
            </span>

            <button
                className='inline-flex ml-16 w-96 h-12 border border-solid border-gray-300 rounded-md'
            >
                <Image
                    src={google}
                    alt='google picture'
                    width={30}
                    height={30}
                    className='mt-2 ml-6'
                >

                </Image>
                <span className='ml-3 m-3'>{data.google}</span>
            </button>

            <button
                className='inline-flex ml-16 w-96 h-12 border border-solid border-gray-300 rounded-md'
            >
                <Image
                    src={apple}
                    alt='apple picture'
                    width={30}
                    height={30}
                    className='mt-1 ml-6'
                >

                </Image>
                <span className='ml-3 m-3'>{data.apple}</span>
            </button>

            <div className='flex justify-center'>

                <span className=' text-2xl'>{data.notAccount}</span>
                <Link
                    href='/register'
                    className='text-blue-600 text-2xl underline '
                >
                    {data.register}
                </Link>

            </div>
        </div >


    )
}
