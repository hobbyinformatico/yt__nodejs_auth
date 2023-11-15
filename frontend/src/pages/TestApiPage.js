import { Box, Button, Card } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useState } from "react";
import Api from "../api/Api";
import Themes from "../settings/Themes";
import RestManager from "../providers/RestManager";



export default function TestApiPage() {

    const themeCurrent = Themes.current();
    const [content, setContent] = useState("");

    const buttons = [
        {
            label: 'test_auth_get',
            onclick: () => {
                (async () => {
                    const res = await Api.test_auth_get();
                    if (res.status === RestManager.STATUS_OK) {
                        setContent(JSON.stringify(res, " ", 2));
                    }
                })();
            }
        },
        {
            label: 'test_auth_post',
            onclick: () => {
                (async () => {
                    const res = await Api.test_auth_post();
                    if (res.status === RestManager.STATUS_OK) {
                        setContent(JSON.stringify(res, " ", 2));
                    }
                })();
            }
        },
        {
            label: 'Applications list',
            onclick: () => {
                (async () => {
                    const res = await Api.applicationsList();
                    if (res.status === RestManager.STATUS_OK) {
                        setContent(JSON.stringify(res.data.data, " ", 2));
                    }
                })();
            }
        },
        {
            label: 'Applications formFields',
            onclick: () => {
                (async () => {
                    const res = await Api.applicationsFormFields();
                    if (res.status === RestManager.STATUS_OK) {
                        setContent(JSON.stringify(res.data.data, " ", 2));
                    }
                })();
            }
        },
        {
            label: 'Users list',
            onclick: () => {
                (async () => {
                    const res = await Api.usersList();
                    if (res.status === RestManager.STATUS_OK) {
                        setContent(JSON.stringify(res.data.data, " ", 2));
                    }
                })();
            }
        },
        {
            label: 'Users formFields',
            onclick: () => {
                (async () => {
                    const res = await Api.usersFormFields();
                    if (res.status === RestManager.STATUS_OK) {
                        setContent(JSON.stringify(res.data.data, " ", 2));
                    }
                })();
            }
        },
        /*
        {
            label: 'TEST 1',
            onclick: () => {
                (async () => {
                    const res = await RestManager.post(
                        `${Urls.BASE_URL}/auth/user/form_fields/abab`
                    );
                    setContent(JSON.stringify(res, " ", 2));
                })();
            }
        },
        */
    ];


    return (
        <Box>
            {
                buttons.map(b => (
                    <Button
                        key={b.label}
                        onClick={b.onclick}
                        sx={{
                            fontSize: themeCurrent.FORMS.BUTTONS.TEXT_SIZE,
                            backgroundColor: themeCurrent.FORMS.BUTTONS.COLOR.DEF,
                            color: themeCurrent.FORMS.BUTTONS.TEXT_COLOR.DEF,
                            '&:hover': {
                                backgroundColor: themeCurrent.FORMS.BUTTONS.COLOR.HOVER,
                                color: themeCurrent.FORMS.BUTTONS.TEXT_COLOR.HOVER,
                            },
                            marginRight: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        {b.label}
                    </Button>
                ))
            }

            <br /><br />
            <Card
                sx={{
                    width: '90%',//'900px',
                    height: '600px',
                    overflow: 'auto',
                    padding: '20px'
                }}
            >
                <TextareaAutosize
                    minRows={10}
                    placeholder='Response request'
                    value={content}
                    style={{
                        width: '95%',//'800px'
                    }}
                />
            </Card>
        </Box>
    );
}