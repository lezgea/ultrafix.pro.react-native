import { View, StyleSheet, ScrollView, TouchableOpacity, Keyboard, FlatList, Text } from "react-native";
import React, { useReducer, useState } from "react";
import { createOrder, getOrderInfo, updateOrder } from "../../../../api";
import { orderReducer } from "@screens/Orders/actions";
import { ORDER_INITIAL, ORDER_TIME_RANGES } from "../../../../constants";
import { Box, Card, Center, Flex, useToast, FormControl } from "native-base";
import moment from "moment";
import { getServices, getTechniciansList } from "../../../../api";
import { SelectedItem } from "../../components";
// import {object, string, number, date, InferType} from 'yup';
// import RNGooglePlaces from "react-native-google-places";
import { OrdersEditStyles as st } from "../../styles";
import {
    UlBlueButton,
    UlBorderedButton,
    UlCard, UlDatePicker,
    UlFormCheckbox,
    UlFormInput,
    UlFormSelect,
    UlHeader,
    UlText
} from "../../../../components";


export default function OrdersEditScreen({ route, navigation }) {
    let { id } = route.params
    const [state, dispatch] = useReducer(orderReducer, {}, () => ORDER_INITIAL)
    const [datePickerVisible, setDatePickerVisible] = useState(false)
    const [services, setServices] = useState([]);
    const [appliances, setAppliances] = useState([]);
    const [selectedTech, setSelectedTech] = useState()
    const [ready, setReady] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false)
    const [techs, setTechs] = useState({
        list: [],
        selected: [],
    })
    const toast = useToast()

    React.useEffect(() => {
        if (!dataLoaded) {
            if (techs.selected.length != 0) {
                getTechniciansList(techs, setTechs)
                setDataLoaded(true)
            }
        }
    }, [techs])

    async function onOrderUpdate() {
        await updateOrder(id, state.data, appliances, (toastProps) => {
            toast.show({ placement: "top", ...toastProps })
        }
        )
    }


    async function onOrderInfoFetch() {
        await getOrderInfo(
            id,
            {},
            (data) => {

                dispatch({
                    type: "all",
                    val: data

                    // {
                    //     id: data?.id,
                    //     address: data?.address,
                    //     longitude: data?.address,
                    //     latitude: data?.address,
                    //     problem_description: "TEST",
                    //     customer_name: "TEST",
                    //     customer_phone: "832-998-6280",
                    //     order_time_range: "14:00-17:00",
                    //     ticket_num: 12079,
                    //     buy_price: "150",
                    //     bought: 1,
                    //     order_at: "2023-03-09",
                    //     address_location: "https://maps.google.com/?q=2742+Fatima+Ave,+Dallas,+TX+75241,+USA&ftid=0x864e97b6b3770067:0x4e00e6bfa047a05",
                    //     status: 4,
                    //     created_at: "2023-03-09T16:23:47.000000Z",
                    //     updated_at: "2023-03-09T19:35:40.000000Z",
                    //     deleted_at: null,
                    //     creator_id: 2,
                    //     type: 1,
                    //     notify_remote_tech: 0,
                    //     state: "TX",
                    //     zip: "75241",
                    //     city: "Dallas",
                    //     users: [
                    //         5
                    //     ],
                    //     creator_percent: 3,
                    //     creator_status: 0,
                    //     technichians: [
                    //         {
                    //             id: 5,
                    //             name: "Aydin"
                    //         }
                    //     ],
                    //     appliances: [
                    //         {
                    //             id: 15568,
                    //             order_id: 6406,
                    //             service_id: 4,
                    //             service_fee: 75,
                    //             brand: "LG fisss",
                    //             created_at: "2023-03-09T16:25:57.000000Z",
                    //             updated_at: "2023-03-09T16:25:57.000000Z",
                    //             model: "palkan"
                    //         }
                    //     ],

                    // }
                })

                setAppliances(data.appliances)
                var temp = []
                for (var i = 0; i < data.technichians.length; i++) {
                    temp[i] = { label: "", value: -1, id: -1 }
                    temp[i].label = data.technichians[i].name
                    temp[i].value = data.technichians[i].id
                }
                setTechs({ ...techs, selected: temp })
            }
        )
    }


    React.useEffect(() => {
        if (ready) {
            onOrderUpdate()
        }

    }, [ready])


    React.useEffect(() => {
        onOrderInfoFetch()
    }, [id])

    React.useEffect(() => {
        getServices(services, setServices);
    }, [])


    function onSelectTechnician(e) {
        let selectedTech = techs?.list?.filter(t => t.value === e)
        setTechs({ ...techs, selected: [...techs.selected, ...selectedTech] })
        dispatch({ type: "users", val: [...state.data.users, selectedTech[0]] })
    }

    function onRemoveTechnician(e) {
        let selectedTech = techs?.selected?.filter(t => t.value !== e.value)
        setTechs({ ...techs, selected: [...selectedTech] })
        dispatch({ type: "users", val: [...selectedTech.map(item => item.value)] })
    }


    return (
        <View style={st.container}>
            <UlHeader
                showBackBtn
                label="Edit Order"
                navigation={navigation}
            />
            <ScrollView style={st.contentWrapper}
                contentContainerStyle={{ paddingBottom: 200 }}
                automaticallyAdjustKeyboardInsets={true}
            >
                <UlCard label="Customer Information">
                    <UlFormInput
                        required
                        name="customer_name"
                        onBlur={handleBlur('customer_name')}
                        style={{
                            borderRadius: 2,
                            borderWidth: errors.customer_name && touched.customer_name ? 1 : 0,
                            borderColor: errors.customer_name && touched.customer_name ? 'red' : null
                        }}
                        value={values.customer_name}
                        onChangeText={handleChange('customer_name')}
                        label="Customer Name"
                        placeholder="Fullname"
                    />

                    <Flex direction="row" space={2}>
                        <Center w="60%" mr={"4%"}>
                            <UlFormInput
                                required
                                name="customer_phone"
                                onBlur={handleBlur('customer_phone')}
                                style={{
                                    borderRadius: 2,
                                    borderWidth: errors.customer_phone && touched.customer_phone ? 1 : 0,
                                    borderColor: errors.customer_phone && touched.customer_phone ? 'red' : null
                                }}
                                value={values.customer_phone}
                                onChangeText={handleChange('customer_phone')}
                                label="Customer Phone"
                                placeholder="xxx-xxx-xxxx"

                            />

                        </Center>
                        <Center w="36%">
                            <UlFormInput
                                label="Zip Code"
                                placeholder="xxxxx"
                                value={state?.data?.zip}
                                onChangeText={(e) => dispatch({ type: "zip", val: e })}
                            />
                        </Center>
                    </Flex>
                    {/* <MyFormInput
            required
            label="Address"
            placeholder="Full Address"
            value={state?.data?.address}
            onChangeText={(e) => dispatch({ type: "address", val: e })}
          /> */}
                    <View>
                        <FormControl.Label
                            style={{ width: "100%", marginBottom: 5, height: 20 }}
                        >
                            Address
                        </FormControl.Label>
                        {/* <TouchableOpacity
                            style={st.wrapper}
                            onPress={() => {
                                RNGooglePlaces.openAutocompleteModal()
                                    .then((place) => {

                                        dispatch({ type: "address", val: place.address })
                                        dispatch({ type: "latitude", val: place.location.latitude });
                                        dispatch({ type: "longitude", val: place.location.longitude });
                                        dispatch({ type: "longitude", val: place.location.longitude });
                                        dispatch({ type: "customer_name", val: values.customer_name });
                                        dispatch({ type: "customer_phone", val: values.customer_phone });

                                        const location = getShortAddressObject(place.addressComponents);
                                        dispatch({ type: "city", val: location["locality"] });

                                    })
                                    .catch((error) => console.log(error.message)); // error is a Javascript Error object
                            }}
                        >
                            <UlText style={{
                                marginTop: 10,
                                marginLeft: 10,
                                color: 'black',
                                fontSize: 16
                            }}>{state?.data?.address}</UlText>
                        </TouchableOpacity> */}
                    </View>

                    <Flex direction="row" space={2}>
                        <Center w="48%" mr={"4%"}>
                            <UlFormInput
                                required
                                name="city"
                                onBlur={handleBlur('city')}
                                style={{
                                    borderRadius: 2,
                                    borderWidth: errors.city && touched.city ? 1 : 0,
                                    borderColor: errors.city && touched.city ? 'red' : null
                                }}
                                value={values.city}
                                onChangeText={handleChange('city')}
                                label="City"
                                placeholder="City"
                            />
                        </Center>
                        <Center w="48%">
                            <UlFormInput
                                required
                                name="state"
                                onBlur={handleBlur('state')}
                                style={{
                                    borderRadius: 2,
                                    borderWidth: errors.state && touched.state ? 1 : 0,
                                    borderColor: errors.state && touched.state ? 'red' : null
                                }}
                                value={values.state}
                                onChangeText={handleChange('state')}
                                label="State"
                                placeholder="State"
                            />
                        </Center>
                    </Flex>
                </UlCard>


                <UlCard label="Service Information">
                    <Flex direction="row" space={2}>
                        <Center w="48%" mr={"4%"}>
                            <UlFormInput
                                required
                                label="Date"
                                placeholder="Order Date"
                                value={state?.data?.order_at}
                                onFocus={() => Keyboard.dismiss()}
                                onPressIn={() => {
                                    Keyboard.dismiss();
                                    setDatePickerVisible(true);
                                }}
                                onChangeText={(e) => dispatch({ type: "order_at", val: e })}
                            />
                        </Center>
                        <Center w="48%">
                            {values.order_time_range != "" ?
                                <UlFormInput
                                    required
                                    name="order_time_range"
                                    onBlur={handleBlur('order_time_range')}
                                    style={{
                                        borderRadius: 2,
                                        borderWidth: errors.order_time_range && touched.order_time_range ? 1 : 0,
                                        borderColor: errors.order_time_range && touched.order_time_range ? 'red' : null
                                    }}
                                    defaultValue={values.order_time_range}
                                    onValueChange={handleChange('order_time_range')}
                                    label="Time Range"
                                    placeholder="Select Range"
                                    options={ORDER_TIME_RANGES}

                                />
                                : null}

                        </Center>
                    </Flex>
                    <UlFormInput
                        required
                        textarea
                        name="problem_description"
                        onBlur={handleBlur('problem_description')}
                        style={{
                            borderRadius: 2,
                            borderWidth: errors.problem_description && touched.problem_description ? 1 : 0,
                            borderColor: errors.problem_description && touched.problem_description ? 'red' : null
                        }}
                        value={values.problem_description}
                        onChangeText={handleChange('problem_description')}
                        label="Note"
                        placeholder="Problem description"

                    />
                </UlCard>

                <UlCard label="Technicians">
                    <UlFormSelect
                        required
                        mt={3}
                        defaultValue={selectedTech}
                        placeholder="Select Technicians"
                        options={techs.list}
                        onValueChange={onSelectTechnician}
                    />
                    <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                        {
                            techs?.selected?.map((item, i) =>
                                <SelectedItem key={i} item={item} onClick={() => onRemoveTechnician(item)} />
                            )
                        }
                    </View>
                </UlCard>

                <UlCard label="Appliances">
                    {
                        !appliances.length &&
                        <Center mt={5}>
                            <UlBorderedButton
                                label="Add Appliance"
                                icon="fog-plus-bold"
                                onPress={() => setAppliances(appliances => [...appliances, {
                                    brand: "",
                                    model: "",
                                    service_fee: "",
                                    problem: "",
                                    service_id: -1,
                                    index: appliances.length
                                }])} />
                        </Center>
                    }
                    <FlatList
                        data={appliances}
                        numColumns={1}
                        renderItem={(item, index) => (
                            <ApplianceCard key={index} setAppliances={setAppliances}
                                appliances={appliances} {...item} services={services} />
                        )}
                        contentContainerStyle={{ padding: 5, paddingTop: 20 }}
                    />
                    {appliances.length > 0 ? (
                        <Center mt={5}>
                            <UlBorderedButton label="Add More Appliances" icon="fog-plus-bold"
                                onPress={() => setAppliances(appliances => [...appliances, {
                                    brand: "",
                                    model: "",
                                    service_fee: "",
                                    problem: "",
                                    service_id: -1,
                                    index: appliances.length
                                }])} />
                        </Center>
                    ) : null}
                </UlCard>

                <UlFormCheckbox
                    label="Notify remote technician"
                    value={!!state?.data?.notify_remote_tech}
                    onChange={() => dispatch({
                        type: 'notify_remote_tech',
                        val: !!state?.data?.notify_remote_tech ? 0 : 1
                    })}
                />

                <UlDatePicker
                    mode="date"
                    open={datePickerVisible}
                    value={new Date()}
                    onClose={() => setDatePickerVisible(false)}
                    onDateChange={(e) => dispatch({ type: 'order_at', val: moment(e).format("YYYY-MM-DD") })}
                />

                <Center mt={5}>
                    <UlBlueButton
                        label="Update Order"
                        onPress={handleSubmit}
                    />
                </Center>


            </ScrollView>
        </View>
    )
}

const ApplianceCard = (props) => {
    let {
        index,
        appliances,
        services,
        setAppliances
    } = props;

    let {
        id,
        service_id,
        brand,
        model,
        service_fee,
        problem,
    } = props.item;


    return (
        <View>
            <TouchableOpacity style={st.close} onPress={() => {
                setAppliances(appliances => appliances.filter((_item, _Index) => _Index !== index));
            }}>
                <UlText style={st.closeLabel}>Remove</UlText>
            </TouchableOpacity>
            <Flex direction="row" space={1}>
                <Center w="48%" mr={"4%"}>
                    <FormControl.Label style={{ width: '100%', marginBottom: -5, height: 20 }}>Type</FormControl.Label>
                    <UlFormSelect
                        required
                        mt={3}
                        defaultValue={service_id}
                        onValueChange={(e) => {
                            setAppliances(appliances => appliances.map((x) => (x.id === id ? {
                                ...x,
                                service_id: e
                            } : x)));
                        }}
                        placeholder="Select Type"
                        options={services}

                    />
                </Center>
                <Center w="48%">
                    <UlFormInput
                        required
                        label="Brand"
                        placeholder="xxxxx"
                        defaultValue={brand}
                        onChangeText={(e) => {
                            console.log(appliances.map((x) => (x.id === id ? { ...x, brand: e } : x)))
                            setAppliances(appliances => appliances.map((x) => (x.id === id ? { ...x, brand: e } : x)));

                        }}
                    />
                </Center>
            </Flex>

            <Flex direction="row" space={2}>
                <Center w="48%" mr={"4%"}>
                    <UlFormInput
                        required
                        label="Model"
                        placeholder="Model"
                        defaultValue={model}
                        onChangeText={(e) => {
                            setAppliances(appliances.map((x) => (x.index === index ? { ...x, model: e } : x)));

                        }}
                    />
                </Center>
                <Center w="48%">
                    <UlFormInput
                        required
                        label="Fee"
                        placeholder="Fee"
                        defaultValue={String(service_fee)}
                        onChangeText={(e) => {
                            setAppliances(appliances.map((x) => (x.index === index ? { ...x, service_fee: e } : x)));
                        }}
                    />
                </Center>
            </Flex>

            <UlFormInput
                required
                textarea
                label="Problem"
                placeholder="Problem description"
                defaultValue={problem}
                onChangeText={(e) => {
                    problem = e
                }}
            />

            <View style={{ marginTop: 20, marginBottom: 20, backgroundColor: 'gray', height: 0.2 }}></View>

        </View>
    );
};

