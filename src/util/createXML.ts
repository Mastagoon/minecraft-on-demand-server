const createXML = (ip: string) => {
  return `<?xml version="1.0" encoding="euc-kr" ?>
<clientinfo>
	<desc>Jazara</desc>
	<servicetype>korea</servicetype>
	<servertype>primary</servertype>
	<connection>
		<display>JazaraRO</display>
      		<address>${ip}</address>
      		<port>6900</port>
      		<version>55</version>
      		<langtype>19</langtype>
		<registrationweb>https://www.youtube.com/watch?v=dQw4w9WgXcQ</registrationweb>
		<loading>
			<image>loading00.jpg</image>
			<image>loading01.jpg</image>
			<image>loading02.jpg</image>
			<image>loading03.jpg</image>
			<image>loading04.jpg</image>
			<image>loading05.jpg</image>
			<image>loading06.jpg</image>
		</loading>
   	</connection>
</clientinfo>
`
}

export default createXML
