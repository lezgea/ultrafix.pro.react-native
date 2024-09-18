import { View, StyleSheet, ScrollView, TouchableOpacity, Keyboard, FlatList, Text } from "react-native";
import React, { useReducer, useState } from "react";
import { createOrder, getInvoiceInfo, getInvoiceTypes, getOrderInfo, onInvoiceUpdate, updateOrder } from "../../../../api";
// import {orderReducer} from "../../actions";
import { ORDER_INITIAL, ORDER_TIME_RANGES } from "../../../../constants";
import { Box, Card, Center, Flex, FormControl, HStack } from "native-base";
import moment from "moment";
import { getServices, getTechniciansList } from "../../../../api";
// import {SelectedItem} from "../../components";
import { Formik } from 'formik'
import * as Animatable from "react-native-animatable";
import RNGooglePlaces from "react-native-google-places";
import { ReportsEditStyles as st } from '../../styles/reports-edit'
import {
    UlBlueButton,
    UlBlueCircleButton,
    UlBorderedButton,
    UlCard,
    UlContentLoader,
    UlDatePicker,
    UlFormCheckbox,
    UlFormInput,
    UlFormSelect,
    UlGrayButton,
    UlHeader,
    UlRedCircleButton,
    UlText
} from "../../../../components";
import { useToast } from "react-native-toast-notifications";



export default function ReportsEditScreen({ route, navigation }) {
    let { id } = route.params;
    const toast = useToast()

    const [state, setState] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            id: id,
            params: {},
            invoiceInfo: {},
            orderInfo: {},
            typesList: [],
            appliance: "",
            loading: false,
            refreshing: false,
        }
    )


    const [params, setParams] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            total_amount: 0,
            parts_price: 0,
            company_expense: 0,
            employee_percent: 0,
            deposit: 0,
            bonus: 0,
            balance: 0,
            description: 0,
            repair_quote: 0,
            payments: [],

            // new
            // files: [],
        }
    )


    function onAddPayment() {
        setParams({
            payments: [
                ...params.payments,
                {
                    type: 0,
                    data: "test",
                    amount: 0,
                }
            ]
        })
    }


    function onRemovePayment(index) {
        let paymentTypes = params.payments
        paymentTypes.splice(index, 1)
        setParams({
            payments: [
                ...paymentTypes,
            ]
        })
    }

    function onSelectPaymentType(value, index) {
        let paymentTypes = params.payments
        paymentTypes[index].type = value
        setParams({ payments: paymentTypes })
    }

    function onChangePaymentAmount(value, index) {
        let paymentTypes = params.payments
        paymentTypes[index].amount = value
        setParams({ payments: paymentTypes })
    }

    function onChangePaymentDetails(value, index) {
        let paymentTypes = params.payments
        paymentTypes[index].data = value
        setParams({ payments: paymentTypes })
    }

    async function loadInvoiceTypes() {
        let response = await getInvoiceTypes({})
        if (response.status === 'success') {
            setState({
                typesList: [...response.data.map(
                    item => ({ label: item.value.toUpperCase(), value: item.id })
                )]
            })
        }
    }

    async function loadInvoiceInfo() {
        setState({ loading: true })
        let response = await getInvoiceInfo({ id: id })
        console.log('^^^^^', response)
        if (response.status === "success") {
            setParams({
                total_amount: response.data?.total_amount || 0,
                parts_price: response.data?.parts_price || 0,
                company_expense: response.data?.company_expense || 0,
                employee_percent: response.data?.employee_percent || 0,
                description: response.data?.description,
                repair_quote: response.data?.repair_quote || 0,
                deposit: response.data?.deposit || 0,
                balance: response.data?.balance || 0,
                bonus: response.data?.bonus || 0,
                payments: !!response.data?.payment_types?.length ? [
                    ...response.data?.payment_types?.map((item, i) => ({
                        type: item.id,
                        data: response.data?.payment_datas[i],
                        amount: 0,
                    }))
                ] : [],
            })
            setState({ loading: false })
            return
        }
        setTimeout(() => setState({ loading: false }), 1000)
    }

    async function onUpdateInvoice() {
        let response = await onInvoiceUpdate({
            total_amount: Number(params.total_amount),
            parts_price: Number(params.parts_price),
            company_expense: Number(params.company_expense),
            employee_percent: Number(params.employee_percent),
            description: params.description,
            repair_quote: Number(params.repair_quote),
            deposit: Number(params.deposit),
            balance: Number(params.balance),
            bonus: Number(params.bonus),
            payments: [...params.payments],
            // files: [],
            id: id,
        })

        console.log('=-==-==-=-=-', response)
        if (response.status === "success") {
            toast.show("Updated Successfully!", { type: "success" })
            navigation.goBack()
        } else {
            toast.show(response.message || response.description, { type: "error" })
        }

    }


    React.useEffect(() => {
        loadInvoiceTypes()
        loadInvoiceInfo()
    }, [id])



    return (
        <View style={st.container}>
            <UlHeader label="Report Update" navigation={navigation} showBackBtn />
            <UlContentLoader loading={state.loading}>
                <ScrollView contentContainerStyle={st.cardsWrapper}>
                    <Animatable.View
                        animation="bounceInLeft"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={800}
                        delay={0}
                        style={st.card}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <UlFormInput
                                    label="Total Amount"
                                    defaultValue={params.total_amount?.toString()}
                                    value={params.total_amount?.toString()}
                                    onChangeText={(e) => setParams({ total_amount: e })}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <UlFormInput
                                    label="Repair Quote"
                                    defaultValue={params.repair_quote?.toString()}
                                    value={params.repair_quote?.toString()}
                                    onChangeText={(e) => setParams({ repair_quote: e })}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <UlFormInput
                                    label="Parts Price"
                                    defaultValue={params.parts_price?.toString()}
                                    value={params.parts_price?.toString()}
                                    onChangeText={(e) => setParams({ parts_price: e })}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <UlFormInput
                                    label="Company Expense"
                                    defaultValue={params.company_expense?.toString()}
                                    value={params.company_expense?.toString()}
                                    onChangeText={(e) => setParams({ company_expense: e })}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <UlFormInput
                                    label="Employee Percent"
                                    defaultValue={params.employee_percent?.toString()}
                                    value={params.employee_percent?.toString()}
                                    onChangeText={(e) => setParams({ employee_percent: e })}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <UlFormInput
                                    label="Bonus"
                                    defaultValue={params.bonus?.toString()}
                                    value={params.bonus?.toString()}
                                    onChangeText={(e) => setParams({ bonus: e })}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <UlFormInput
                                    label="Deposit"
                                    defaultValue={params.deposit?.toString()}
                                    value={params.deposit?.toString()}
                                    onChangeText={(e) => setParams({ deposit: e })}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <UlFormInput
                                    label="Balance"
                                    defaultValue={params.balance?.toString()}
                                    value={params.balance?.toString()}
                                    onChangeText={(e) => setParams({ balance: e })}
                                />
                            </View>
                        </View>
                    </Animatable.View>
                    <Animatable.View
                        animation="bounceInRight"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={800}
                        delay={40}
                        style={[st.card, { position: "relative", paddingVertical: 15, }]}
                    >
                        <View>
                            <UlText style={{ fontSize: 16, fontWeight: "500", marginBottom: 2, }}>Payments</UlText>
                            <UlText style={{ fontSize: 12, fontStyle: "italic", width: "90%", color: "#D8811C" }}>
                                The amount for a Credit card must be set including fee
                            </UlText>
                        </View>
                        <View style={{ position: "absolute", right: 13, top: 13 }}>
                            <UlBlueCircleButton
                                size={38}
                                icon="fog-plus-bold"
                                onPress={onAddPayment}
                            />
                        </View>
                    </Animatable.View>

                    {
                        !!params.payments?.length && params.payments?.map((item, i) =>
                            <Animatable.View
                                animation="bounceInLeft"
                                easing="ease-in-out"
                                iterationCount="1"
                                duration={800}
                                delay={80}
                                style={st.card}
                            >
                                <View style={{ position: "absolute", right: 13, top: 13, zIndex: 5, }}>
                                    <UlRedCircleButton
                                        size={38}
                                        icon="fog-minus-bold"
                                        onPress={() => onRemovePayment(i)}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 3, marginRight: 10 }}>
                                        <UlFormSelect
                                            label="Type"
                                            value={item.type}
                                            defaultValue={item.type}
                                            options={state.typesList}
                                            onValueChange={(e) => onSelectPaymentType(e, i)}
                                        />
                                    </View>
                                    <View style={{ flex: 4 }}>
                                        <UlFormInput
                                            label="Amount"
                                            defaultValue={item.amount?.toString()}
                                            value={item.amount?.toString()}
                                            onChangeText={(e) => onChangePaymentAmount(e, i)}
                                        />
                                    </View>
                                </View>
                                <HStack space={3} justifyContent="center">
                                    <UlFormInput
                                        label="Details"
                                        defaultValue={item.data}
                                        value={item.data}
                                        onChangeText={(e) => onChangePaymentDetails(e, i)}
                                    />
                                </HStack>
                            </Animatable.View>
                        )
                    }

                    <Animatable.View
                        animation="bounceInRight"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={800}
                        delay={120}
                        style={st.card}
                    >
                        <HStack space={3} justifyContent="center">
                            <UlFormInput
                                textarea
                                h={40}
                                label="Description"
                                defaultValue={params.description}
                                value={params.description}
                                onChangeText={(e) => setParams({ description: e })}
                            />
                        </HStack>
                    </Animatable.View>
                </ScrollView>

                <Animatable.View
                    animation="bounceInRight"
                    easing="ease-in-out"
                    iterationCount="1"
                    duration={800}
                    delay={10}
                    style={st.bottomButtonsWrapper}
                >
                    <View style={{ width: "100%", zIndex: 3 }}>
                        <View style={st.buttonsRow}>
                            <View style={{ flex: 1, padding: 5, }}>
                                <UlGrayButton
                                    label="Cancel"
                                    style={{ height: 40 }}
                                    onPress={() => navigation.goBack()}
                                />
                            </View>
                            <View style={{ flex: 1, padding: 5 }}>
                                <UlBlueButton
                                    label="Save"
                                    style={{ height: 40 }}
                                    onPress={onUpdateInvoice}
                                />
                            </View>
                        </View>
                    </View>
                </Animatable.View>

            </UlContentLoader>
        </View >
    )
}







// *****************************************
// 
// *****************************************
//
// *****************************************
// OLD 







function ReportsEditScreenOld({ route, navigation }) {
    let { id } = route.params
    // const [state, dispatch] = useReducer(orderReducer, {}, () => ORDER_INITIAL)
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
    // const toast = useToast()

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
                        <TouchableOpacity
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
                        </TouchableOpacity>
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

