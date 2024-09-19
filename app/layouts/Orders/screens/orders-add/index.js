import {
    View,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    Text,
    FlatList,
} from "react-native";
import React, { useReducer, useState } from "react";
import { createOrder, getOrderInfo } from "../../../../api";
import { orderReducer } from "../../actions";
import { ORDER_INITIAL, ORDER_TIME_RANGES } from "../../../../constants";
import { Box, Card, Center, Flex, useToast, FormControl } from "native-base";
import moment from "moment";
import { getServices, getTechniciansList } from "../../../../api";
import { ApplianceInfoCard, SelectedItem } from "../../components";
// import RNGooglePlaces from "react-native-google-places";
import { Formik } from 'formik'
// import { object, string, number, date, InferType } from 'yup';
import { OrdersAddStyles as st } from "../../styles";
import {
    UlBlueButton,
    UlBorderedButton,
    UlCard, UlDatePicker,
    UlFormCheckbox,
    UlFormInput,
    UlFormSelect,
    UlHeader, UlText,
} from "../../../../components";


export default function OrdersAddScreen({ navigation }) {
    const [state, dispatch] = useReducer(orderReducer, {}, () => ORDER_INITIAL);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [techs, setTechs] = useState({
        list: [],
        selected: [],
    });

    const [ready, setReady] = useState(false);
    const [services, setServices] = useState([]);
    const [appliances, setAppliances] = useState([]);
    const toast = useToast();

    function onOrderCreate() {
        createOrder(state, dispatch, navigation, (toastProps) => {
            toast.show({ placement: "top", ...toastProps });
        });
    }

    function getShortAddressObject(object) {
        let address = {};
        const address_components = object;
        address_components.forEach(element => {
            address[element.types[0]] = element.shortName;
        });
        return address;
    }


    function onSelectTechnician(e) {
        let selectedTech = techs?.list?.filter((t) => t.value === e);
        setTechs({ ...techs, selected: [...techs.selected, ...selectedTech] });
        dispatch({
            type: "users",
            val: [...state.data.users, selectedTech[0].value],
        });
    }

    function onRemoveTechnician(e) {
        let selectedTech = techs?.selected?.filter((t) => t.value !== e.value);
        setTechs({ ...techs, selected: [...selectedTech] });
        dispatch({
            type: "users",
            val: [...selectedTech.map((item) => item.value)],
        })
    }


    React.useEffect(() => {
        if (ready) {
            onOrderCreate()
        }
    }, [ready])


    React.useEffect(() => {
        getTechniciansList(techs, setTechs);
        getServices(services, setServices);
    }, [])


    return (
        <View style={st.container}>
            <UlHeader
                showBackBtn
                label="New Order"
                navigation={navigation}
            />
            <ScrollView
                style={st.contentWrapper}
                contentContainerStyle={{ paddingBottom: 200 }}
                automaticallyAdjustKeyboardInsets={true}
            >
                {/* <Formik
                    enableReinitialize
                    initialValues={{
                        customer_name: state.data.customer_name,
                        customer_phone: state.data.customer_phone,
                        city: state.data.city,
                        state: state.data.state,
                        order_time_range: state.data.order_time_range,
                        problem_description: state.data.problem_description
                    }}
                    validationSchema={object().shape({
                        customer_name: string().required(),
                        customer_phone: string().required(),
                        city: string().required(),
                        state: string().required(),
                        order_time_range: string().required(),
                        problem_description: string().required()
                    })}
                    onSubmit={values => {
                        let entries = Object.entries(values)
                        entries.map(([key, val] = entry) => {
                            dispatch({ type: key, val: val })
                        });
                        if (appliances.length > 0) {
                            var complete_data = true;
                            for (var i = 0; i < appliances.length; i++) {
                                if (
                                    appliances[i].service_fee == -1 ||
                                    appliances[i].brand == "" ||
                                    appliances[i].model == "" ||
                                    appliances[i].service_fee == ""
                                ) {
                                    complete_data = false;
                                    break;
                                }
                            }
                            if (complete_data) {
                                dispatch({ type: "appliances", val: appliances });
                                setReady(true)
                            } else {
                                toast.show({
                                    placement: "top",
                                    description: "Please input appliances data",
                                });
                            }
                        } else {
                            setReady(true)
                        }

                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating }) => (
                        <>
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
                                                .catch((error) => {
                                                    toast.show({
                                                        placement: "top",
                                                        description: error,
                                                    });
                                                });
                                        }}
                                    >
                                        <Text style={{
                                            marginTop: 10,
                                            marginLeft: 10,
                                            color: 'black',
                                            fontSize: 16
                                        }}>{state?.data?.address}</Text>
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
                                        <UlFormSelect
                                            required
                                            name="order_time_range"
                                            onBlur={handleBlur('order_time_range')}
                                            style={{
                                                borderRadius: 2,
                                                borderWidth: errors.order_time_range && touched.order_time_range ? 1 : 0,
                                                borderColor: errors.order_time_range && touched.order_time_range ? 'red' : null
                                            }}
                                            value={values.order_time_range}
                                            onValueChange={handleChange('order_time_range')}
                                            label="Time Range"
                                            placeholder="Select Range"
                                            options={ORDER_TIME_RANGES}

                                        />
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
                                    selectedValue={""}
                                    placeholder="Select Technicians"
                                    options={techs.list}
                                    onValueChange={onSelectTechnician}
                                />
                                <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                                    {techs?.selected?.map((item, i) => (
                                        <SelectedItem
                                            key={i}
                                            item={item}
                                            onClick={() => onRemoveTechnician(item)}
                                        />
                                    ))}
                                </View>
                            </UlCard>

                            <UlCard label="Appliances">
                                {appliances.length == 0 ? (
                                    <Center mt={5}>
                                        <UlBorderedButton
                                            label="Add Appliance"
                                            icon="fog-plus-bold"
                                            onPress={() =>
                                                setAppliances((appliances) => [
                                                    ...appliances,
                                                    {
                                                        brand: "",
                                                        model: "",
                                                        service_fee: "",
                                                        problem: "",
                                                        service_id: -1,
                                                        index: appliances.length,
                                                    },
                                                ])
                                            }
                                        />
                                    </Center>
                                ) : null}
                                <FlatList
                                    data={appliances}
                                    numColumns={1}
                                    renderItem={(item, index) => (
                                        <ApplianceCard
                                            key={index}
                                            setAppliances={setAppliances}
                                            appliances={appliances}
                                            {...item}
                                            services={services}
                                        />
                                    )}
                                    contentContainerStyle={{ padding: 5, paddingTop: 20 }}
                                />
                                {appliances.length > 0 ? (
                                    <Center mt={5}>
                                        <UlBorderedButton
                                            label="Add More Appliances"
                                            icon="fog-plus-bold"
                                            onPress={() =>
                                                setAppliances((appliances) => [
                                                    ...appliances,
                                                    {
                                                        brand: "",
                                                        model: "",
                                                        service_fee: "",
                                                        problem: "",
                                                        service_id: -1,
                                                        index: appliances.length,
                                                    },
                                                ])
                                            }
                                        />
                                    </Center>
                                ) : null}
                            </UlCard>

                            <UlFormCheckbox
                                label="Notify remote technician"
                                value={!!state?.data?.notify_remote_tech}
                                onChange={() =>
                                    dispatch({
                                        type: "notify_remote_tech",
                                        val: !!state?.data?.notify_remote_tech ? 0 : 1,
                                    })
                                }
                            />
                            <UlDatePicker
                                mode="date"
                                open={datePickerVisible}
                                value={new Date()}
                                onClose={() => setDatePickerVisible(false)}
                                onDateChange={(e) =>
                                    dispatch({ type: "order_at", val: moment(e).format("YYYY-MM-DD") })
                                }
                            />

                            <Center mt={5}>
                                <UlBlueButton label="Create Order" onPress={handleSubmit} />
                            </Center>
                        </>
                    )}
                </Formik> */}
            </ScrollView>
        </View>
    );
}

const ApplianceCard = (props) => {
    let {
        index,
        id,
        service_id,
        appliances,
        brand,
        model,
        service_fee,
        problem,
        services,
        setAppliances,
    } = props;

    return (
        <View>
            <TouchableOpacity
                style={st.close}
                onPress={() => {
                    setAppliances((appliances) =>
                        appliances.filter((_item, _Index) => _Index !== index)
                    );
                }}
            >
                <UlText style={st.closeLabel}>Remove</UlText>
            </TouchableOpacity>
            <Flex direction="row" space={1}>
                <Center w="48%" mr={"4%"}>
                    <FormControl.Label
                        style={{ width: "100%", marginBottom: -5, height: 20 }}
                    >
                        Type
                    </FormControl.Label>
                    <UlFormSelect
                        required
                        mt={3}
                        onValueChange={(e) => {
                            setAppliances(
                                appliances.map((x) =>
                                    x.index === index ? { ...x, service_id: e } : x
                                )
                            );
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
                        value={brand}
                        onChangeText={(e) => {
                            setAppliances(
                                appliances.map((x) =>
                                    x.index === index ? { ...x, brand: e } : x
                                )
                            );
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
                        value={model}
                        onChangeText={(e) => {
                            setAppliances(
                                appliances.map((x) =>
                                    x.index === index ? { ...x, model: e } : x
                                )
                            );
                        }}
                    />
                </Center>
                <Center w="48%">
                    <UlFormInput
                        required
                        label="Fee"
                        placeholder="Fee"
                        value={service_fee}
                        onChangeText={(e) => {
                            setAppliances(
                                appliances.map((x) =>
                                    x.index === index ? { ...x, service_fee: e } : x
                                )
                            );
                        }}
                    />
                </Center>
            </Flex>

            <UlFormInput
                required
                textarea
                label="Problem"
                placeholder="Problem description"
                value={problem}
                onChangeText={(e) => {
                    problem = e;
                }}
            />

            <View
                style={{
                    marginTop: 20,
                    marginBottom: 20,
                    backgroundColor: "gray",
                    height: 0.2,
                }}
            ></View>
        </View>
    );
};

