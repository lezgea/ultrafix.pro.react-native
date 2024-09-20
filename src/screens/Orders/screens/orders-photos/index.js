import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { UlHeader, UlContentLoader, UlText, UlBlueCircleButton, UlEmptyContent, UlRedCircleButton } from "../../../../components";
import { addOrderPhoto, getOrderInfo, ordersFileDelete, ordersFileUpload } from "../../../../api";
import { OrdersPhotosStyles as st } from "../../styles";
import { useToast } from "react-native-toast-notifications";
import VX from "../../../../plugins/vx";
// import FastImage from 'react-native-fast-image'
import ImageView from "react-native-image-viewing";
import variables from "../../../../config/variables";
// import * as ImagePicker from "react-native-image-picker"
// import RNFS from 'react-native-fs';

// const Image = createImageProgress(FastImage);

// const createFormData = (photo, body) => {
//     const data = new FormData();
//     data.append('photo', {
//         name: photo.fileName,
//         type: photo.type,
//         uri:
//             Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
//     });
//     Object.keys(body).forEach((key) => {
//         data.append(key, body[key]);
//     });
//     return data;
// };

export const OrdersPhotosScreen = ({ route, navigation }) => {
    let { id } = route.params
    const toast = useToast()


    const [state, setState] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            id: id,
            data: {},
            loading: false,
            imageIndex: 0,
            imageBinary: "",
            imageFile: {},
            imagePreviewVisible: false,
        },
    )

    async function loadData() {
        setState({ loading: true })
        let response = await getOrderInfo({ id: id })
        if (response.status === "success") {
            setState({ data: response.data })
        }
        setState({ loading: false })
    }


    // function onClickUpdate() {
    //     toast.show("Description!", { type: "success" })
    // }


    let date = state.data?.created_at?.split(" ")[0]

    React.useEffect(() => {
        loadData()
    }, [id])


    const [avatar, setAvatar] = React.useState();
    const [title, setTitle] = React.useState('Profile Photo');


    const handlePicker = async () => {
        // await ImagePicker.launchImageLibrary({}, (response) => {
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //         setState({ imageFile: response.assets[0] })
        //     }
        // })
    }


    async function uploadImage() {
        let response = await ordersFileUpload({ id: id, file: state.imageFile })
        // console.log('@@@@', response)
    }


    async function onDeletePhoto(fileId) {
        let response = await ordersFileDelete({ id: id, file_id: fileId })
        if (response.status === 'success') {
            loadData()
            toast.show(
                'Deleted Successfully!',
                { type: "success" },
            )
        } else {
            toast.show(
                response.message || response.description || 'Something went wrong',
                { type: "error" },
            )
        }
    }


    React.useEffect(() => {
        if (!!state.imageFile?.uri) {
            uploadImage()
        }
    }, [state.imageFile])

    console.log('$$$$$', state.data)

    return (
        <View style={st.container}>
            <UlHeader
                label={`Order Photos`}
                showBackBtn
                navigation={navigation}
            />
            <UlContentLoader loading={state.loading}>
                <ScrollView contentContainerStyle={st.cardsWrapper}>
                    {
                        !state.data?.files?.length &&
                        <UlEmptyContent />
                    }
                    {
                        state.data?.files?.map((file, i) =>
                            <TouchableOpacity
                                style={{
                                    minWidth: "48%",
                                    maxWidth: "49%",
                                    margin: "0.5%",
                                    borderRadius: 5,
                                    overflow: "hidden",
                                }}
                                onPress={() => setState({
                                    imageIndex: i,
                                    imagePreviewVisible: true,
                                })}
                            >
                                {
                                    !(state.data?.status === 3 || state.data?.status === 5) &&
                                    <View style={{ position: "absolute", right: 13, top: 13, zIndex: 5, }}>
                                        <UlRedCircleButton
                                            size={38}
                                            icon="fog-minus-bold"
                                            onPress={() => onDeletePhoto(file.id)}
                                        />
                                    </View>
                                }
                                {/* <Image
                                    source={{ uri: file.url }}
                                    indicator={<Progress.Circle size={100} indeterminate={true} />}
                                    style={{
                                        flex: 1,
                                        maxHeight: VX.screenWidth() / 1.5,
                                        minHeight: VX.screenWidth() / 1.5,
                                    }}
                                    renderError={() => {
                                        return <View><UlText>Error</UlText></View>
                                    }}
                                /> */}
                            </TouchableOpacity>

                        )
                    }
                    <ImageView
                        images={state.data?.files?.map(item => ({ uri: item.url }))}
                        imageIndex={state.imageIndex}
                        visible={state.imagePreviewVisible}
                        onRequestClose={() => setState({ imagePreviewVisible: false })}
                    />
                </ScrollView>

                {
                    !(state.data?.status === 3 || state.data?.status === 5) &&
                    <View style={{ position: "absolute", right: VX.screenWidth() / 2 - 30, bottom: variables.tabBarHeight + 25 }}>
                        <UlBlueCircleButton
                            size={60}
                            icon="fog-plus-bold"
                            onPress={() => handlePicker()}
                        />
                    </View>
                }
            </UlContentLoader>
        </View >
    )
}

